import { useMutation, useQueryClient } from '@tanstack/react-query';
import {todoKeys} from '../constants/index.js';
import {todoApi} from '../services/todoApi.js';

export const useUpdateTodo = (currentFilters) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updates }) => todoApi.update(id, updates),

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists() });
      const previousData = queryClient.getQueryData(todoKeys.list(currentFilters));

      queryClient.setQueryData(todoKeys.list(currentFilters), (old) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo,
          ),
        };
      });

      return { previousData };
    },

    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(todoKeys.list(currentFilters), context.previousData);
      }
      console.error(error.response?.data?.message || 'Failed to update todo');
    },

    onSuccess: () => {
      console.log('todo updated successfully');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  const updateTodo = async (id, updates) => {
    try {
      await mutation.mutateAsync({ id, updates });
      return true;
    } catch {
      return false;
    }
  };

  return { updateTodo, isUpdating: mutation.isPending };
};

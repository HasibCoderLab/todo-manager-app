import { useMutation, useQueryClient } from '@tanstack/react-query';
import {todoKeys} from '../constants/index.js';
import {todoApi} from '../services/todoApi.js';

export const useDeleteTodo = (currentFilters) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => todoApi.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.lists() });
      const previousData = queryClient.getQueryData(todoKeys.list(currentFilters));

      queryClient.setQueryData(todoKeys.list(currentFilters), (old) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter(todo => todo._id !== id)
        };
      });

      return { previousData };
    },

    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(todoKeys.list(currentFilters), context.previousData);
      }
      console.error(error.response?.data?.message || 'Failed to delte todo');
    },

    onSuccess: () => {
      console.log('todo deleted');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });

  const deleteTodo = async (id) => {
    try {
      await mutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
  };

  return { deleteTodo, isDeleting: mutation.isPending };
};

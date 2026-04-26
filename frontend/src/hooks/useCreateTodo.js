import {useMutation, useQueryClient} from '@tanstack/react-query';
import {todoApi} from '../services/todoApi.js';
import {todoKeys} from '../constants/index.js';

export const useCreateTodo = () => {
  const queryClient = useQueryClient()
 const mutation = useMutation({
   mutationFn: todoData => todoApi.create(todoData),
   onSuccess: () => {
     queryClient.invalidateQueries({queryKey: todoKeys.all})
     console.log('todo created')
   },
   onError: error => {
     console.error(error.respoonse?.data?.message || 'failed to create todo')
   }
 })
  const createTodo = async (todoData) => {
   try {
     await mutation.mutateAsync(todoData)
     return true
   } catch {
     return false
   }
  }
  return {
    createTodo,
    isCreating: mutation.isPending
  }
}
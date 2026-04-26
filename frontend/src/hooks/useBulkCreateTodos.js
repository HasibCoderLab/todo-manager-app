import {useMutation, useQueryClient} from '@tanstack/react-query';
import {todoApi} from '../services/todoApi.js';
import {todoKeys} from '../constants/index.js';

export const useBulkCreateTodos = () => {
  const queryClient = useQueryClient()
 const mutation = useMutation({
   mutationFn: todosArray => todoApi.bulkCreate(todosArray),
   onSuccess: (response, todosArray) => {
     queryClient.invalidateQueries({queryKey: todoKeys.all})
     const countResponse = response.data?.data?.count || todosArray.length
     console.log(countResponse)
   }
 })
  const bulkCreateTodos = async (todosArray) => {
   try {
     await mutation.mutateAsync(todosArray)
     return true
   } catch {
     return false
   }
  }
  return {
   bulkCreateTodos
  }
}
import {useQuery} from '@tanstack/react-query';
import {todoKeys} from '../constants/index.js';
import {todoApi} from '../services/todoApi.js';
import {parseApiResponse} from '../utils/parseApiResponse.js';

export const useTodosQuery = filters => {
  const {data, refetch} = useQuery({
    queryKey: todoKeys.list(filters),
    queryFn: async () => {
     const params = {page: filters.page, limit: filters.limit}
     if (filters.status) params.status = filters.status
     if (filters.search) params.search = filters.search

     const response = await todoApi.getAll(params)
      return parseApiResponse(response.data)
    }
  })
  return {
    todos: data?.todos ?? [],
    pagination: data?.pagination ?? {currentPage: 1, totalPages: 1, total: 0, limit: filters.limit},
    refetch
  }
}
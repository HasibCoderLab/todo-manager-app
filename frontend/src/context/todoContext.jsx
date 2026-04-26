import {createContext, useCallback, useContext, useState} from 'react';
import {useCreateTodo} from '../hooks/useCreateTodo.js';
import {useTodosQuery} from '../hooks/useTodosQuery.js';
import {useBulkCreateTodos} from '../hooks/useBulkCreateTodos.js';
import {useUpdateTodo} from '../hooks/useUpdateTodo.js';
import {useDeleteTodo} from '../hooks/useDeleteTodo.js';

const TodoContext = createContext(null)

export const useTodoContext = () => {
 const context = useContext(TodoContext)
 if (!context) {
  throw new Error('useTodoContext must be used')
 }
 return context
}

const default_filters = {
 status: '',
 search: '',
 page: 1,
 limit: 6
}

export const TodoProvider = ({children}) => {
 const [filters, setFilters] = useState(default_filters)

 const {todos, pagination, refetch} = useTodosQuery(filters)
 const {createTodo} = useCreateTodo()
 const {bulkCreateTodos} = useBulkCreateTodos()
 const {updateTodo} = useUpdateTodo(filters)
 const {deleteTodo} = useDeleteTodo(filters)

 const resetPages = useCallback(newFilters => {
   setFilters(prevState => ({
    ...prevState,
    ...newFilters,
    page: newFilters.status !== undefined || newFilters.search !== undefined
      ? 1 : newFilters.page || prevState.page
   }))},
   [],
 );

 const value = {
  createTodo,
  setFilters: resetPages,
  todos,
  pagination,
  filters,
  fetchTodos: refetch,
  bulkCreateTodos,
  updateTodo,
  deleteTodo
 }
 return <TodoContext.Provider value={value}>
   {children}
 </TodoContext.Provider>
}
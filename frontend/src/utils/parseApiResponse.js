const defaultPagination = {
  currentPage: 1,
  totalPages: 1,
  total: 0,
  limit: 6
}

export const parseApiResponse = (rawData) => {
  const extractPagination = pagination => ({
    total: pagination?.total ?? 0,
    totalPages: pagination?.totalPages ?? pagination?.pages ?? 1,
    currentPage: pagination?.currentPage ?? 1,
    limit: pagination?.limit ?? limit
  })
 if (rawData?.data?.todos) {
   return {
     todos: rawData.data.todos,
     pagination: extractPagination(rawData.data.pagination)
   }
 }
 if (rawData?.todos) {
   return {
     todos: rawData.todos,
     pagination: extractPagination(rawData.pagination)
   }
 }
 if (Array.isArray(rawData)) {
   return {
     todos: rawData,
     pagination: {...defaultPagination, total: rawData.length}
   }
 }
 return {
   todos: [],
   pagination: {...defaultPagination}
 }
}
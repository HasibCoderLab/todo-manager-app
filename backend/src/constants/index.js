export const validation = {
  title_max_length: 100,
  description_max_length: 500,
  bulk_create_max: 10
}

export const todo_status = {
  active: 'active',
  inactive: 'inactive',
  completed: 'completed'
}

export const validStatus = Object.values(todo_status)

export const pagination = {
  default_page: 1,
  max_limit: 100
}
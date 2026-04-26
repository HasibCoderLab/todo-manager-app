import {AppError} from '../utils/appError.js';
import {validation, validStatus} from '../constants/index.js';

const isNonEmptyString = value =>
  typeof value === 'string' && value.trim().length > 0


// export const validateCreateTodo = (req, res, next) => {
//  const {title, description, status} = req.body
//   if (!isNonEmptyString(title)) {
//     return next(AppError.badRequest('please provide a valid title'))
//   }
//   if (!isNonEmptyString(description)) {
//     return next(AppError.badRequest('please provide a valid description'))
//   }
//   if (title.length > validation.title_max_length) {
//     return next(AppError.badRequest(`title cannot exceed ${validation.title_max_length}`))
//   }
//   if (status && !validStatus.includes(status)) {
//     return next(AppError.badRequest(`status must be one of: ${validStatus.join(', ')}`))
//   }
//   next()
// }

export const validateCreateTodo = (req, res, next) => {
 const {title, description, status} = req.body
 // console.log(req.body)
 if (typeof title !== 'string' || !title.trim()) {
  return next(AppError.badRequest('please provide a valid title'))
 }
 if (typeof description !== 'string' || !description.trim()) {
  return next(AppError.badRequest('please provide a valid description'))
 }
 if (title.length > validation.title_max_length) {
  return next(AppError.badRequest(`title cannot exceed ${validation.title_max_length}`))
 }
 if (status && !validStatus.includes(status)) {
  return next(AppError.badRequest(`status must be one of: ${validStatus.join(', ')}`))
 }
 req.validateData = {
  title: title.trim(),
  description,
  status
 }
 next()
}


export const validateCreateBulkTodos = (req, res, next) => {
 const {todos} = req.body
 if (!Array.isArray(todos)) {
  return next(AppError.badRequest('please provide an array of todos'))
 }
 if (todos.length === 0) {
  return next(AppError.badRequest('todos array cannot be empty'))
 }
 if (todos.length > validation.bulk_create_max) {
  return next(AppError.badRequest(`cannot create more than ${validation.bulk_create_max} todos`))
 }
 if (todos.some(todo => !isNonEmptyString(todo.title))) {
  return next(AppError.badRequest('please provide a valid title'))
 }
 if (todos.some(todo => todo.title.length > validation.title_max_length)) {
  return next(AppError.badRequest(`title cannot exceed ${validation.title_max_length}`))
 }
 if (todos.some(todo => todo.status && !validStatus.includes(todo.status))) {
  return next(AppError.badRequest(`status must be one of: ${validStatus.join(', ')}`))
 }
 req.validateBulkData = todos.map(({title, description, status}) => ({
  title: title.trim(),
  description: description && description.trim() ? description.trim() : 'No description',
  status
 }))
 next()
}

export const validateUpdateTodo = (req, res, next) => {
 const {title, description, status} = req.body

 if (title !== undefined) {
  if (!isNonEmptyString(title))
   return next(AppError.badRequest('please provide a valid title'))
  if (title.length > validation.title_max_length)
   return next(AppError.badRequest(`title cannot exceed ${validation.title_max_length}`))
 }
 if (description !== undefined) {
  if (!isNonEmptyString(description))
   return next(AppError.badRequest('please provide a valid description'))
 }
 if (status !== undefined) {
  if (!validStatus.includes(status))
   return next(AppError.badRequest(`status must be one of: ${validStatus.join(', ')}`))
 }
 req.validateUpdateData = {
  ...(title && {
   title: title.trim()
  }),
  ...(description && {
   description: description.trim()
  }),
  ...(status && {status})
 }
 next()
}
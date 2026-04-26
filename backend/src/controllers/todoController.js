import { asyncHandler } from '../middlewares/asyncHandler.js';
import { Todo } from '../models/todoModel.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { pagination } from '../constants/index.js';
import { AppError } from '../utils/appError.js';

const buildFilterQuery = ({ status, search }) => {
  const query = {}
  if (status?.trim()) query.status = status
  if (search?.trim()) query.title = { $regex: search, $options: 'i' }
  return query
}

const buildPagination = (total, page, limit) => ({
  total,
  totalPages: Math.ceil(total / limit) || 1,
  currentPage: page,
  limit
})

export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create(req.validateData)
  successResponse(res, todo, 'todo created successfully', 201)
})

export const getTodos = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10)
  const limit = Math.min(parseInt(req.query.limit, 10) || pagination.default_page, pagination.max_limit)
  const query = buildFilterQuery(req.query)
  const [todos, total] = await Promise.all([
    Todo.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Todo.countDocuments(query)
  ])
  successResponse(res, { todos, pagination: buildPagination(total, page, limit) }, 'todos retrieved successfully', 200)
})

export const createBulkTodos = asyncHandler(async (req, res) => {
  const created = await Todo.insertMany(req.validateBulkData, { ordered: false })
  successResponse(res, { count: created.length, todos: created }, `${created.length} todos created successfully`, 201)
})

export const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) throw AppError.notFound('todo not found')
  successResponse(res, todo, 'todo retrieved successfully', 200)
})


export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id)
  if (!todo) throw AppError.notFound('todo not found')
  successResponse(res, todo, 'todo deleted successfully', 200)
})

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id,
    { $set: req.validateUpdateData }, { returnDocument: 'after', runValidators: true })
  if (!todo) throw AppError.notFound('todo not found')
  successResponse(res, todo, 'todo updated successfully', 200)
})
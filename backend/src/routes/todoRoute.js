import {Router} from 'express';
import {createBulkTodos, createTodo, deleteTodo, getTodoById, getTodos, updateTodo} from '../controllers/todoController.js';
import {validateCreateBulkTodos, validateCreateTodo, validateUpdateTodo} from '../middlewares/validateTodo.js';

const router = Router()

router.post('/post', validateCreateTodo, createTodo)
router.get('/get', getTodos)
router.post('/bulk', validateCreateBulkTodos, createBulkTodos)
router.get('/:id', getTodoById)
router.delete('/:id', deleteTodo)
router.put('/:id',validateUpdateTodo, updateTodo)

export const todoRoute = router
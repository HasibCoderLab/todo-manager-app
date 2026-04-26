import React from 'react'
import {Calendar, CheckCircle2, Edit2, Trash2} from 'lucide-react';
import {status_config, todo_status} from '../constants/index.js';
import {useTodoContext} from '../context/todoContext.jsx';

export const TodoItem = ({ todo, onEdit }) => {
  const {updateTodo, deleteTodo} = useTodoContext()
  const formatDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  const config = status_config[todo.status]
  const isCompleted = todo.status === todo_status.completed
  const StatusIcon = config.icon

  const handleStatusToggle = async () => {
   const statusToggle = isCompleted ? todo_status.active : todo_status.completed
   await updateTodo(todo._id, {status: statusToggle})
  }

  const handleDelete = async () => {
   await deleteTodo(todo._id)
  }
  return (
    <>
      <div
        className='glass rounded-2xl p-5 animate-slide-up hover:shadow-xl transition-all duration-300'
      >
        <div className="flex items-start justify-between gap-4">

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3
                className={`text-lg font-semibold truncate ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.title}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${config.bg} ${config.text} ${config.border}`}
              >
                <StatusIcon size={12} />
                {config.label}
              </span>
            </div>
            {todo.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {todo.description}
              </p>
            )}

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={12} />
              {formatDate}
            </div>
          </div>


          <div className="flex flex-col gap-1">
            <button
              onClick={handleStatusToggle}
              className={`p-2 rounded-lg transition-colors ${isCompleted ? 'text-green-600 hover:bg-green-50'
                : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <CheckCircle2 size={20} />
            </button>

            <button
              onClick={() => onEdit(todo)}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Edit2 size={20} />
            </button>
            <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
              <Trash2 size={20} />
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

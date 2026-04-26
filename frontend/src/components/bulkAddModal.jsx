import React, {useState} from 'react'
import {Layers, Loader2, Plus, Trash2, X} from 'lucide-react';
import {useTodoContext} from '../context/todoContext.jsx';
import {status_options, todo_status} from '../constants/index.js';

const maxBulkItems = 10

const defaultCreateEmpty = () => ({
  title: '',
  description: '',
  status: todo_status.active
})

export const BulkAddModal = ({onClose}) => {
  const {bulkCreateTodos} = useTodoContext()
  const [todos, setTodos] = useState([defaultCreateEmpty()])
  const [submitting, setSubmitting] = useState(false)

  const statusOptions = status_options.filter(opt => opt.value !== '')
  const validCount = todos.filter(t => t.title.trim()).length

  const addRow = () => {
    if (todos.length >= maxBulkItems) return
    setTodos(prevState => [...prevState, defaultCreateEmpty()])
  }
  const removeRow = index => {
    setTodos(prevState => prevState.filter((_, idx) => idx !== index))
  }
  const updateRow = (index, field, value) => {
    setTodos(prevState => prevState.map((todo, idx) => idx === index ? {
      ...todo,
      [field]: value
    } : todo))
  }
  
  const handleSubmit = async e => {
   e.preventDefault()
    const validTodos = todos.filter(t => t.title.trim())
    if (validTodos.length === 0) return
    setSubmitting(true)
    const success = await bulkCreateTodos(validTodos)
    setSubmitting(false)
    if (success) onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-slide-up">

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Layers className="text-indigo-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Bulk Add Todos</h3>
              <p className="text-sm text-gray-500">
                Add up to {maxBulkItems} todos at once
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-3">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                  <input
                    type='text'
                    placeholder='title'
                    value={todo.title}
                    onChange={e => updateRow(index, 'title', e.target.value)}
                    className="md:col-span-4 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"

                  />
                  <input
                    type='text'
                    placeholder='description'
                    value={todo.description}
                    onChange={e => updateRow(index, 'description', e.target.value)}
                    className="md:col-span-6 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"

                  />
                  <select
                    value={todo.status}
                    onChange={e => updateRow(index, 'status', e.target.value)}
                    className="md:col-span-2 w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {todos.length > 1 && (
                  <button
                    type='button'
                    onClick={() => removeRow(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

              </div>
            ))}
          </div>
          {todos.length < maxBulkItems && (
            <button
              type='button'
              onClick={addRow}
              className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Plus size={18} />
              Add Another Todo ({todos.length} / {maxBulkItems})
            </button>
          )}

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type='submit'
              disabled={submitting || validCount === 0}
              className="btn-primary flex-1"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) :  <Plus size={18} />}
              Create {validCount} Todo{validCount !== 0 && validCount !== 1 ? 's' : ''}
            </button>
            <button
              type='button'
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

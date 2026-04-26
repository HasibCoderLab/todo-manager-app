import React, { useDeferredValue, useEffect, useState } from 'react'
import { useTodoContext } from '../context/todoContext.jsx';
import { Stats } from './stats.jsx';
import { Filter, ListPlus, Search } from 'lucide-react';
import { status_options } from '../constants/index.js';
import { TodoItem } from './todoItem.jsx';
import { BulkAddModal } from './bulkAddModal.jsx';
import { TodoForm } from './todoForm.jsx';
import {Pagination} from './pagination.jsx';

export const TodoList = () => {
  const { todos, filters, setFilters } = useTodoContext()
  const [searchInput, setSearchInput] = useState(filters.search)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const deferredSearch = useDeferredValue(searchInput)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (deferredSearch !== filters.search) {
        setFilters({ search: deferredSearch })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [deferredSearch, filters.search, setFilters]);

  return (
    <div className="space-y-6">
      <Stats />
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Todos</h2>
            <p className="text-gray-500 text-sm mt-1">
              Showing {todos.length} items
            </p>
          </div>

          <button
            onClick={() => setShowBulkModal(true)}
            className="btn-secondary"
          >
            <ListPlus size={18} />
            Bulk Add
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type='text'
              placeholder='search todos.....'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/90"
            />
          </div>


          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filters.status}
              onChange={e => setFilters({ status: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white/90 min-w-35"
            >
              {status_options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='grid gap-4'>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onEdit={setEditingTodo}
          />
        ))}
      </div>

      <Pagination />

      {editingTodo && (
        <TodoForm todo={editingTodo} onClose={() => setEditingTodo(null)} />
      )}
      {showBulkModal && (
        <BulkAddModal onClose={() => setShowBulkModal(false)} />
      )}
    </div>
  )
}

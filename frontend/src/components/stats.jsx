import React from 'react'
import {CheckCircle2, Circle, Clock, Icon, Layers} from 'lucide-react';
import {todo_status} from '../constants/index.js';
import {useTodoContext} from '../context/todoContext.jsx';

const stat_items = [
  {
    key: 'total',
    label: 'Total',
    icon: Layers,
    color: 'from-indigo-500 to-purple-500',
    text: 'text-indigo-700',
  },
  {
    key: todo_status.active,
    label: 'Active',
    icon: Clock,
    color: 'from-blue-500 to-cyan-500',
    text: 'text-blue-700',
  },
  {
    key: todo_status.completed,
    label: 'Completed',
    icon: CheckCircle2,
    color: 'from-green-500 to-emerald-500',
    text: 'text-green-700',
  },
  {
    key: todo_status.inactive,
    label: 'Inactive',
    icon: Circle,
    color: 'from-gray-500 to-slate-500',
    text: 'text-gray-700',
  },
];


export const Stats = () => {
  const {todos, pagination} = useTodoContext()
  const counts = {
    total: pagination.total || todos.length,
    [todo_status.active]: todos.filter(t => t.status === todo_status.active).length,
    [todo_status.completed]: todos.filter(t => t.status === todo_status.completed).length,
    [todo_status.inactive]: todos.filter(t => t.status === todo_status.inactive).length
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stat_items.map(({key, label, icon: Icon, color, text}) => (
        <div
          key={key}
          className="glass rounded-2xl p-4 flex items-center gap-3 hover:shadow-lg transition-all duration-300"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white shadow-md`}
          >
            <Icon size={24}/>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {counts[key]}
            </p>
            <p className={`text-sm font-medium ${text}`}>
              {label}
            </p>

          </div>
        </div>
      ))}
    </div>
  )
}

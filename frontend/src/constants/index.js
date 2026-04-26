import {CheckCircle2, Circle, Clock} from 'lucide-react';

export const todo_status = {
  active: 'active',
  inactive: 'inactive',
  completed: 'completed'
}

export const status_options = [
  {value: '', label: 'All status'},
  {value: todo_status.active, label: 'Active'},
  {value: todo_status.inactive, label: 'Inactive'},
  {value: todo_status.completed, label: 'Completed'}
]

export const todoKeys = {
  all: ['todos'],
  lists: () => [...todoKeys.all, 'list'],
  list: filters => [...todoKeys.lists(), filters]
}

export const status_config = {
  [todo_status.active]: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Clock,
    label: 'Active',
  },
  [todo_status.inactive]: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
    icon: Circle,
    label: 'Inactive',
  },
  [todo_status.completed]: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: CheckCircle2,
    label: 'Completed',
  },
};

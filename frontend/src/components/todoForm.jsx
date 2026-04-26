import {status_options, todo_status} from '../constants/index.js';
import {useEffect, useState} from 'react';
import {useTodoContext} from '../context/todoContext.jsx';
import {Loader2, Plus, Save, Sparkles, X} from 'lucide-react';

const initialData = {
    title: '',
    description: '',
    status: todo_status.active
  }

export const TodoForm = ({todo = null, onClose = null}) => {
  const isEditMode = Boolean(todo)
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialData)
  const [submitting, setSubmitting] = useState(false)

  const { createTodo, updateTodo } = useTodoContext();
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        status: todo.status
      })
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    setSubmitting(true);
    const success = isEditMode
      ? await updateTodo(todo._id, formData)
      : await createTodo(formData)
    setSubmitting(false);
    if (success) {
      if (isEditMode) {
        onClose()
      }
      else {
        setFormData(initialData)
        setIsOpen(false)
      }
    }
  }

  const handleCancel = () => {
    if (isEditMode) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formFields = (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="input-field"
          placeholder="What needs to be done?"
          maxLength={100}
          autoFocus={!isEditMode}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="input-field min-h-25 resize-none"
          placeholder="Add details (optional)"
          maxLength={500}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => updateField('status', e.target.value)}
          className="input-field"
        >
          {status_options.filter((opt) => opt.value !== '').map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  const actionButtons = (
    <div className={`flex gap-3 ${isEditMode ? 'pt-4' : 'pt-2'}`}>
      <button
        type="submit"
        disabled={submitting || !formData.title.trim()}
        className="btn-primary flex-1"
      >
        {submitting ? (
          <Loader2 className="animate-spin" size={18} />
        ) : isEditMode ? (
          <Save size={18} />
        ) : (
          <Plus size={18} />
        )}
        {isEditMode ? 'Save Changes' : 'Create Todo'}
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="btn-secondary flex-1"
      >
        Cancel
      </button>
    </div>
  );

  if (isEditMode) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Edit Todo</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {formFields}
            {actionButtons}
          </form>
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="mb-8">
        <button onClick={() => setIsOpen(true)} className="btn-primary">
          <Plus size={20} />
          Add New Todo
        </button>
      </div>
    );
  }
  return (
    <div className="mb-8">
      <div className="glass rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-indigo-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Create New Todo</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields}
          {actionButtons}
        </form>
      </div>
    </div>
  );
}

import React from 'react'
import {useTodoContext} from '../context/todoContext.jsx';
import {ChevronLeft, ChevronRight} from 'lucide-react';

const maxVisiblePages = 5
  const getPageNumbers = (currentPages, totalPages) => {
   let start = Math.max(1, currentPages - Math.floor(maxVisiblePages / 2))
   const end = Math.min(totalPages, start + maxVisiblePages - 1)
   if (end - start < maxVisiblePages - 1) {
     start = Math.max(1, end - maxVisiblePages + 1)
   }
   const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }
export const Pagination = () => {
 const {pagination, filters, setFilters} = useTodoContext()
  if (pagination.totalPages <= 1) return
  const {totalPages} = pagination
  const currentPage = filters.page
  const pages = getPageNumbers(currentPage, totalPages)
  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setFilters({page})
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`min-w-11 h-11 rounded-xl font-semibold transition-all ${page === currentPage
            ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

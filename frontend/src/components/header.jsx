import React from 'react'
import {CheckCircle2, Sparkles} from 'lucide-react';

export const Header = () => {
  return (
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl mb-6 animate-bounce-soft">
          <CheckCircle2 size={40} className="text-white" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-5xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
            Todo Master
          </h1>
          <Sparkles className="text-yellow-500 animate-pulse" size={28} />
        </div>

        <p className="text-gray-600 text-lg font-medium">
          Task Management Reimagined
        </p>
      </header>
  )
}

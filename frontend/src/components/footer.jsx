import React from 'react'
import {Github} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-16 text-center">
      <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm border border-white/40">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium group"
        >
          <Github size={20} className="group-hover:rotate-12 transition-transform" />
          View on GitHub
        </a>

        <span className="text-gray-300">|</span>

        <span className="text-gray-500 text-sm font-medium">
                    © {currentYear} Todo Master
                </span>
      </div>
    </footer>
  )
}

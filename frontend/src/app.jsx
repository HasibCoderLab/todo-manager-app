import React from 'react'
import {Header} from './components/header.jsx';
import {Footer} from './components/footer.jsx';
import {TodoForm} from './components/todoForm.jsx';
import {TodoProvider} from './context/todoContext.jsx';
import {TodoList} from './components/todoList.jsx';

export const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className='max-w-4xl mx-auto'>
        <Header />
        <main className='space-y-6'>
          <TodoForm />
          <TodoList />
        </main>
        <Footer />
      </div>
    </div>
    </TodoProvider>
  )
}

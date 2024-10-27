import './App.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    <Toaster />
    </>
  )
}
export default App

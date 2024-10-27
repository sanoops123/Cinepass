import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const Navigate =useNavigate()
  return (
    <div>
        <h1>404 Error</h1>
        <button onClick={()=>Navigate('/')} >back to home   </button>
        
    </div>
  )
}

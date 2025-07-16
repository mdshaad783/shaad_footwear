import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

function App() {

  return (
    <>
      <ToastContainer/>
      <Navigation/>
      <main className='pt-3'>
        <Outlet/>
      </main>
    </>
  )
}

export default App

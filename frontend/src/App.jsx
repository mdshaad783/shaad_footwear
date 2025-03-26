import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer/>
      <Navigation/>
      <main className='py-3'>
        <Outlet/>
      </main>
    </>
  )
}

export default App

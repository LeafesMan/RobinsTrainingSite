import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './firebase.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup.tsx'
import ResizeableBox from './components/ResizeableBox.tsx'
import Navbar from './components/Navbar.tsx'
import Signin from './pages/Signin.tsx'
import Dashboard from './pages/Dashboard.tsx'



// Create router instance
const router = createBrowserRouter([
  {
  path: "/",
  element: <><Navbar /><h1>Home</h1></>,
  },
  {
    path:"/dashboard",
    element: <Dashboard />,
  },
  {
  path: "/signup",
  element: <><Navbar /><ResizeableBox><Signup></Signup></ResizeableBox></>,
  },
  {
  path: "/signin",
  element: <Signin/>,
  },
  {
  path: "/stinfo",
  element: <><Navbar /><h1>STINFO Training</h1></>,
  },
  {
    path: "/nofear",
    element: <><Navbar /><h1>No Fear Act Training</h1></>,
  },
  {
    path: "/records",
    element: <><Navbar /><h1>Records Management Training</h1></>,
  },
  {
  path: "/management",
  element: <><Navbar /><h1>Management</h1></>,
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

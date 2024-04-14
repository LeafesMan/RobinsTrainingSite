import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './firebase.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup.tsx'
import ResizeableBox from './components/ResizeableBox.tsx'
import Navbar from './components/Navbar.tsx'
import Signin from './pages/Signin.tsx'
import NoFearAct from './pages/NoFearAct.tsx'
import STINFO from './pages/STINFO.tsx';
import Dashboard from './pages/Dashboard.tsx'
import Profile from './pages/Profile.tsx'
import Certs from './pages/Certs.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'



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
  element: <><Navbar /><h1>STINFO Training</h1><STINFO/></>,
  },
  {
    path: "/nofear",
    element: <><Navbar /><h1>No Fear Act Training</h1><NoFearAct></NoFearAct></>
  },
  {
    path: "/records",
    element: <><Navbar /><h1>Records Management Training</h1></>,
  },
  {
  path: "/management",
  element: <><Navbar /><h1>Management</h1></>,
  },
  {
    path:"/profile",
    element: <Profile />,
  },
  {
    path: "/certificates",
    element: <Certs />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

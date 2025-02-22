import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Update from './components/Update'

const Root = () => {
     const route=createBrowserRouter([
        {
            path:"/",
            element:<App/>
        },
        {
            path:"/update",
            element:<Update/>
        }
     ])
  return <RouterProvider router={route}/>
}

export default Root

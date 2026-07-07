import React from 'react'
import Browse from './Browse'
import { createBrowserRouter , RouterProvider } from 'react-router-dom' 
import LoginUser from './LoginUser'


const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <LoginUser />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ])

  return (
    <div>
        <RouterProvider router={appRouter} />
        
    </div>
  )
}

export default Body
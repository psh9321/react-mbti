import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { HomeView } from "./views/Home"
import { TestView } from "./views/Test"
import { TestResultView } from "./views/TestResult"
import { NotFoundView } from "./views/NotFound"

const router = createBrowserRouter([
  {
    path : "/",   
    children : [
      {
        index : true,
        element : <HomeView/>
      },
      {
        path : "/test",
        element : <TestView/>
      }, 
      {
        path : "/result/:mbti",
        element : <TestResultView/>,
      },
      {
        path : "*",
        element : <NotFoundView/>
      }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App

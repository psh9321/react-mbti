import { RouterProvider } from 'react-router-dom'

import "./css/globals.css"

import AppRouter from './AppRouter'

const App = () => {
    return <RouterProvider router={AppRouter} />
}

export default App

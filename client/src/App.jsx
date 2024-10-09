import './App.css'
import Home from './Components/Home/Home'
import Asignaturas from './Components/Asignaturas/Asignaturas'
import Profesores from './Components/Profesores/Profesores'
import Web_oficial from './Components/Web_oficial/Web_oficial'


// Importar el dominio del enrutador React
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import Homeuser from './Components/Homeuser/Homeuser'
import Userpage from './Components/Userpage/Userpage'

function App() {
  // Crear el enrutador
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/asignaturas',
      element: <Asignaturas />,
    },
    {
      path: '/profesores',
      element: <Profesores/>,
    },
    {
      path: '/web',
      element: <Web_oficial />,
    },

    {
      path: '/profile',
      element: <Userpage />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/user',
      element: <Homeuser />,
    },
    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
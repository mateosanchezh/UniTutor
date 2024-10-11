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
import Tutorias from './Components/Userpage/Tutorias/Tutorias'

const ScrollHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const scrollToSection = (section) => {
        const element = document.querySelector(`.${section}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      scrollToSection(location.state.scrollTo);
    }
  }, [location]);

  return children;
};

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
    {
      path: '/tutorias',
      element: <Tutorias />,
    },


    
  ])

  return (
    
    <RouterProvider router={router} />
    
  )
}

export default App
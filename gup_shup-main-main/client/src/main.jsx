import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Home/Homepage.jsx'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import ProtectedRoutes from './componets/ProtectedRoutes'


const render = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoutes>
      <Homepage/>
      </ProtectedRoutes>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={render}/>
    <App />
    </Provider>
 
  </StrictMode>,
)

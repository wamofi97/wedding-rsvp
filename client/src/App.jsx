import './App.css'
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './routes/AdminPage';
import Register from './routes/Register';
import Login from './routes/Login';
import Home from './routes/Home';
import { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateWedding from './routes/CreateWedding';
import WeddingLanding from './routes/WeddingLanding';
import EditWedding from './routes/EditWedding';
import NotFoundPage from './routes/NotFoundPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method : "GET",
        headers : {token : localStorage.token}
      })
      const data = await response.json()
      setIsAuthenticated(data === true ? true : false)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <div className='container d-flex gap-5 flex-column align-items-center' style={{ maxWidth: '500px'}}>
      <Router>
        <Routes >
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : <Navigate to="/dashboard"/>}/>
          <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : <Navigate to="/dashboard"/>}/>
          <Route exact path="/dashboard" element={isAuthenticated ? (<AdminPage setAuth={setAuth}/>) : <Navigate to="/login"/>}/>
          <Route path="/create-wedding" element={<CreateWedding />} />
          <Route path="/wedding/:id" element={<WeddingLanding />} />
          <Route path="/wedding/:id/edit" element={<EditWedding />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer/>   
    </div>
  )
}

export default App

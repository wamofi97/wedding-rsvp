import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import CreateWedding from './routes/CreateWedding';
import WeddingLanding from './routes/WeddingLanding';
import EditWedding from './routes/EditWedding';
import NotFoundPage from './routes/NotFoundPage';
import Footer from './components/Footer';


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
    <div className='container mx-auto px-8 pt-8 pb-4' style={{ maxWidth: '800px', minHeight: '100vh'}}>
      <Router>
        <Routes >
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/register" element={!isAuthenticated ? (<Register setAuth={setAuth}/>) : <Navigate to="/dashboard"/>}/>
          <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : <Navigate to="/dashboard"/>}/>
          <Route exact path="/dashboard" element={isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : <Navigate to="/login"/>}/>
          <Route path="/create-wedding" element={isAuthenticated ? (<CreateWedding setAuth={setAuth}/>) : <Navigate to="/login"/>} />
          <Route path="/wedding/:id" element={<WeddingLanding />} />
          <Route path="/wedding/:id/edit" element={<EditWedding />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
      </Router>
      
      <ToastContainer/>   
      
    </div>
  )
}

export default App

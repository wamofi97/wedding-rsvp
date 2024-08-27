import './App.css'
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from './routes/AdminPage';
import Register from './routes/Register';
import Login from './routes/Login';
import Home from './routes/Home';
import { useState } from 'react';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className='container d-flex gap-5 flex-column align-items-center' style={{ maxWidth: '500px'}}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/register" element={!isAuthenticated ? (<Register />) : <Navigate to="/login"/>}/>
          <Route exact path="/login" element={!isAuthenticated ? (<Login />) : <Navigate to="/dashboard"/>}/>
          <Route exact path="/dashboard" element={!isAuthenticated ? (<Register />) : <Navigate to="/dashboard"/>}/>
        </Routes>
      </Router>   
    </div>
  )
}

export default App

import {useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })
  
  const {name, email, password} = inputs

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const body = {name,email,password}
      const response = await fetch("http://localhost:5000/auth/register",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if(data.token){
        localStorage.setItem("token", data.token)
        setAuth(true)
        toast.success("Registered succesfully!")
      }else{
        setAuth(false)
        toast.error(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={e => handleChange(e)} type="name" name='name' value={name} placeholder='name' className='form-control my-3' />
        <input onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='email' className='form-control my-3'/>
        <input onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='password' className='form-control my-3'/>
        <button type='submit' className='btn btn-success btn-block w-100'>Register</button>
      </form>
      <Link to="/login">Login</Link>
      <ToastContainer/>
    </div>
  )
}

export default Register
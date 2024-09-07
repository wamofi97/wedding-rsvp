import { useState } from "react"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const {email, password} = inputs

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const body = {email,password}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (data.token){
        localStorage.setItem("token", data.token)
        setAuth(true)
        toast.success("login succesfully!")
      } else{
        setAuth(false)
        toast.error(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='w-100  text-center py-5 px-3' style={{minHeight:"95vh"}}>
      <h4>WELCOME BACK TO</h4>
      <h5>walimatulRSVP</h5>
      <p className='ps'>Start creating your dream wedding RSVP page today.</p>
      <hr className='my-5'/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className='pr mb-1 d-block text-start'>Email</label>
        <input onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='Enter your email' className='form-control mb-3' style={{border:'none',backgroundColor: "#FFF8D4"}}/>

        <label htmlFor="password" className='pr mb-1 d-block text-start'>Password</label>
        <input onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='Enter your password' className='form-control mb-3' style={{border:'none',backgroundColor: "#FFF8D4"}}/>
        <button type='submit' className='button btn-primary'>Login</button>
      </form>
      <Link to="/register" className="link linkyellow">Do not have account yet? Lets register</Link>
      <ToastContainer/>
    </div>
  )
}

export default Login
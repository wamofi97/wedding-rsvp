import {useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState('');
  
  const {name, email, password, confirmPassword} = inputs

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      if(confirmPassword !== password){
        setError("Oops! Your passwords don’t match. Please make sure both fields have the same password.")
        throw new Error("Passwords do not match")
      }
      const body = {name,email,password}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`,{
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
    <div className='w-100 pt-5 text-center' style={{height: "100vh"}}>
      <h4>WELCOME TO</h4>
      <h5>walimatulRSVP</h5>
      <p className='ps'>Start creating your dream wedding RSVP page today.</p>
      <hr className='my-5'/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className='pr mb-1 d-block text-start'>Name</label>
        <input onChange={e => handleChange(e)} type="name" name='name' value={name} placeholder='Enter your name' className='form-control mb-3' style={{border:'none',backgroundColor: "#FFF8D4" }}/>

        <label htmlFor="email" className='pr mb-1 d-block text-start'>Email</label>
        <input onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='Enter your email' className='form-control mb-3' style={{border:'none',backgroundColor: "#FFF8D4"}}/>

        <label htmlFor="password" className='pr mb-1 d-block text-start'>Password</label>
        <input onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='Enter your password' className='form-control mb-3' style={{border: error ? '1px solid red' : 'none', backgroundColor: "#FFF8D4" }}/>

        <label htmlFor="confirmPassword" className='pr mb-1 d-block text-start'>Reconfirm password</label>
        <input onChange={e => handleChange(e)} type="password" name='confirmPassword' value={confirmPassword} placeholder='Re-enter your password' className='form-control mb-3' style={{border: error ? '1px solid red' : 'none', backgroundColor: "#FFF8D4" }}/>

        {error && <p className='pr' style={{ color: 'red' }}>{error}</p>}

        <button type='submit' className='button btn-primary text-center'>Register</button>
      </form>
      <Link to="/login" className='link linkyellow'>Already have an account? Log In</Link>
      
      <ToastContainer/>
    </div>
  )
}

export default Register
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import walimatulRSVPLogo from '../assets/walimatulRSVPLogo.svg'
import Footer from '../components/Footer'


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
        // toast.success("Registered succesfully!")
      }else{
        setAuth(false)
        toast.error(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='w-full text-center px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
      <h4>WELCOME TO</h4>
      <img src={walimatulRSVPLogo} alt="walimatulRSVP logo" className='mx-auto w-44 mb-5'/>
      <p className='ps'>Start creating your dream wedding RSVP page today.</p>
      <hr className='my-8'/>
      <form className='w-full' onSubmit={handleSubmit}>
        <label htmlFor="name" className='pr block mb-1 text-start'>Name</label>
        <input 
        className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" 
        onChange={e => handleChange(e)} 
        type="name" 
        name='name' 
        value={name} 
        placeholder='Enter your name' 
        style={{border:'none',backgroundColor: "#FFF8D4" }}
        />

        <label htmlFor="email" className='pr block mb-1 text-start'>Email</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"  onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='Enter your email' style={{border:'none',backgroundColor: "#FFF8D4"}}/>

        <label htmlFor="password" className='pr block mb-1 text-start'>Password</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='Enter your password' style={{border: error ? '1px solid red' : 'none', backgroundColor: "#FFF8D4" }}/>

        <label htmlFor="confirmPassword" className='pr block mb-1 text-start'>Reconfirm password</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" onChange={e => handleChange(e)} type="password" name='confirmPassword' value={confirmPassword} placeholder='Re-enter your password' style={{border: error ? '1px solid red' : 'none', backgroundColor: "#FFF8D4" }}/>

        {error && <p className='pr' style={{ color: 'red' }}>{error}</p>}

        <button type='submit' className='button btn-primary max-w-fit '>Register</button>
      </form>
      <Link to="/login" className='link linkyellow'>Already have an account? Log In</Link>
      <hr className='my-8'/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default Register
import { useState } from "react"
import { Link } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import walimatulRSVPLogo from '../assets/walimatulRSVPLogo.svg'
import Footer from '../components/Footer'
import Spinner from "../components/Spinner"
import { Toaster, toast } from 'sonner'


const Login = ({setAuth}) => {
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      const body = {email,password}
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (data.token){
        setLoading(false)
        localStorage.setItem("token", data.token)
        setAuth(true)
        toast.success("login succesfully!")
      } else{
        setAuth(false)
        setLoading(false)
        toast.error(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='w-full flex flex-col items-center px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
      <Toaster position="top-center" richColors/>
      <h4>WELCOME BACK TO</h4>
      <img src={walimatulRSVPLogo} alt="walimatulRSVP logo" className='mx-auto w-44 mb-5'/>
      <p className='ps'>Start creating your dream wedding RSVP page today.</p>
      <hr className='my-5'/>

      <form className="flex flex-col w-full sm:w-4/5 " onSubmit={handleSubmit}>
        <label htmlFor="email" className='pr mb-1 text-start'>Email</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='Enter your email' style={{border:'none',backgroundColor: "#FFF8D4"}}/>

        <label htmlFor="password" className='pr mb-1 text-start'>Password</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent" onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='Enter your password' style={{border:'none',backgroundColor: "#FFF8D4"}}/>
        <button type='submit' className='button btn-primary max-w-fit self-center my-2'>{
          loading ? 
          <div className="flex items-center gap-2">
            <Spinner/>
            <p className="pr">Logging in..</p>
          </div>  : 
          "Login" }
          </button>
      </form>
      <Link to="/register" className="link linkyellow">Do not have account yet? Lets register</Link>
      <hr className="my-8"/>
      <Footer/>
    </div>
  )
}

export default Login
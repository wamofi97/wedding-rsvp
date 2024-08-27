import { useState } from "react"
import { Link } from "react-router-dom"

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
      const response = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const data = await response.json()
      console.log(data)
      localStorage.setItem("token", data.token)
      setAuth(true)

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={e => handleChange(e)} type="email" name='email' value={email} placeholder='email' className='form-control my-3'/>
        <input onChange={e => handleChange(e)} type="password" name='password' value={password} placeholder='password' className='form-control my-3'/>
        <button type='submit' className='btn btn-success btn-block w-100'>login</button>
      </form>
      <Link to="/register" >Do not have account yet? Lets register</Link>
    </div>
  )
}

export default Login
import EventForm from '../components/form/EventForm'
import { useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CreateWedding = ({setAuth}) => {
  const [name,setName] = useState("")

  const fetchName = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      console.log(data)
      setName(data.username)
    } catch (error) {
      console.error(error.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    // toast.success("Logout successfully!")
  }

  useEffect(() => {
    
    fetchName()
  },[])

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h1>Welcome {name}!</h1>
        <h2>Create your own wedding RSVP!</h2>
        <EventForm />
        {/* <ToastContainer /> */}
        <button className='button' onClick={e=>logout(e)}>Logout</button>
    </div>
  )
}

export default CreateWedding
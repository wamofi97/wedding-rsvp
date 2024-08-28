import EventForm from '../components/form/EventForm'
import AturcaraForm from '../components/form/AturcaraForm'
import ContactForm from '../components/form/ContactForm'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = ({setAuth}) => {
  const [name,setName] = useState("")

  const fetchName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      setName(data.username)

    } catch (error) {
      console.error(error.message)
    }
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    toast.success("Logout successfully!")
  }

  useEffect(() => {
    fetchName()
  })

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h1>ADMIN PAGE</h1>
        <h2>Welcome {name}!</h2>
        <button className='btn btn-primary' onClick={e=>logout(e)}>Logout</button>
        <EventForm />
        <AturcaraForm />
        <ContactForm />
        <ToastContainer />
    </div>
  )
}

export default AdminPage
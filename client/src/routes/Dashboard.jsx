// import EventForm from '../components/form/EventForm'
// import AturcaraForm from '../components/form/AturcaraForm'
// import ContactForm from '../components/form/ContactForm'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({setAuth}) => {
  const [name,setName] = useState("")
  const [title,setTitle] = useState("")
  const [linkPage, setLinkPage] = useState("")
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      console.log(data)
      if(!data.has_wedding){
        navigate('/create-wedding')
      }
      setName(data.username)
      setTitle(data.wedding_title)
      setLinkPage(data.user_id)
    } catch (error) {
      console.error(error.message)
    }
  }

  const navigateEdit = () =>{
    navigate('/wedding/:id/edit')
  }

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    toast.success("Logout successfully!")
    console.log(localStorage.token)
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h1>ADMIN PAGE</h1>
        <h2>Welcome {name}!</h2>
        <p>Wedding title : {title} </p>
        <p>Go to created page : <Link to={`/wedding/${linkPage}`} >http://localhost:5173/wedding/{linkPage}</Link></p>

        <button onClick={e => navigateEdit(e)} className='btn btn-secondary my-4'>Edit wedding</button>
        {/* <EventForm />
        <AturcaraForm />
        <ContactForm /> */}
        <ToastContainer />
        <button className='btn btn-dark' onClick={e=>logout(e)}>Logout</button>
    </div>
  )
}

export default Dashboard
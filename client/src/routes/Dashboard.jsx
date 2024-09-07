// import EventForm from '../components/form/EventForm'
// import AturcaraForm from '../components/form/AturcaraForm'
// import ContactForm from '../components/form/ContactForm'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({setAuth}) => {
  const [name,setName] = useState("")
  const [linkPage, setLinkPage] = useState("")
  const [weddingPageLink, setWeddingPageLink] = useState('')
  const [copySuccess, setCopySuccess] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
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
      setLinkPage(data.user_id)
      setWeddingPageLink(`${import.meta.env.VITE_API_URL}/wedding/${linkPage}`)
    } catch (error) {
      console.error(error.message)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(weddingPageLink)
      .then(() => {
        setCopySuccess('Link copied!');
      })
      .catch(err => {
        setCopySuccess('Failed to copy link');
      });
  };

  const navigateEdit = () =>{
    navigate(`/wedding/${linkPage}/edit`)
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
  },[name])

  return (
    <div className='d-flex flex-column align-items-center w-100 py-5 vh-100'>
        <h4>Dashboard</h4>
        <p className='pr'>Congratulations <strong>{name}</strong>! Your personalized wedding RSVP page is ready. From here, you can manage every detail of your special day. </p>

        <h5>Your Wedding Page</h5>
        <p className='ps'>Share this link with your guests to invite them to your wedding. It’s as easy as copy and paste!</p>
        
        <textarea className='w-100 text-center pr' style={{border: 'none', borderRadius: '8px', height:'3em', backgroundColor: '#FFF8D4'}} defaultValue={weddingPageLink}></textarea>
        <div className='d-flex gap-3'>
          <button className='button btn-secondary' onClick={copyToClipboard} >Copy Link</button>
          <button className='button btn-primary'><a href={`/wedding/${linkPage}`} target="_blank" className='linkpage'>View Page</a></button>
        </div>
        
        {copySuccess && <p className='pr' style={{ color: 'green', marginTop: '10px' }}>{copySuccess}</p>}

        <button onClick={e => navigateEdit(e)} className='button'>Edit wedding</button>
        {/* <EventForm />
        <AturcaraForm />
        <ContactForm /> */}
        <ToastContainer />
        <button className='button' onClick={e=>logout(e)}>Logout</button>
    </div>
  )
}

export default Dashboard
import { useState, useEffect } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import walimatulRSVPLogo from '../assets/walimatulRSVPLogo.svg'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import { Toaster, toast } from 'sonner'


const Dashboard = ({setAuth}) => {
  const [name,setName] = useState("")
  const [weddingPageLink, setWeddingPageLink] = useState('')
  const [copySuccess, setCopySuccess] = useState('');
 
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      if(!data.has_wedding){
        navigate('/create-wedding')
      }

      setName(data.username)
      setWeddingPageLink(`${import.meta.env.VITE_DOMAIN_URL}/wedding/${data.id}`)
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
        console.log(err)
      });
  };

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    toast.success("Logout successfully!")
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className='px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
        <Toaster/>
        <img className='mx-auto w-20' src={walimatulRSVPLogo} alt="Walimatul RSVP Logo " />
        <div className='my-6 text-center'>
          <h4 className='mb-2'>Dashboard</h4>
          <p className='pr'>Congratulations <span className='font-semibold'>{name}</span>! Your personalized wedding RSVP page is ready. From here, you can manage every detail of your special day. </p>
        </div>
        
        <div>
          <h5 className='mb-2'>Your Wedding Page</h5>
          <p className='ps'>Share this link with your guests to invite them to your wedding. It’s as easy as copy and paste!</p>
          <div className='w-100 text-center ' >
            <p className='pr my-2 px-4 py-2 overflow-x-auto' style={{border: 'none', borderRadius: '8px', backgroundColor: '#FFF8D4'}}>{weddingPageLink ? weddingPageLink : "..Loading"}</p>
            {copySuccess && <p className='pr text-green-500'>{copySuccess}</p>}
          </div>
          <div className='flex justify-center gap-4'>
            <button className='button btn-secondary' onClick={copyToClipboard} >Copy Link</button>
            <button className='button btn-primary' onClick={() => window.open(`${weddingPageLink}`, '_blank')}>View Page</button>
          </div>
        </div>

        <div>
          <h5 className='my-4'>Manage Your Wedding</h5>

          <div>
            <p className='font-semibold mt-4'>Edit Your Details</p>
            <p className='pr'>Need to make changes? Update your wedding details anytime by clicking the button below.</p>
            <Link to={`${weddingPageLink}/edit`} className='link underline font-medium'><button className='button btn-tertiary underline'>Edit details</button></Link>
          </div>
          <div>
            <p className='font-semibold mt-4'>RSVP Management</p>
            <p className='pr'>Keep track of who’s attending. View and manage your guest list effortlessly, and ensure everyone is ready to celebrate with you.</p>
            <Link to={`${weddingPageLink}/rsvp`} className='link underline font-medium'><button className='button btn-tertiary underline'>Manage RSVPs</button></Link>
          </div>
          <div>
            <p className='font-semibold mt-4'>Guest Wishes</p>
            <p className='pr'>Read the warm wishes and heartfelt messages from your guests. Their words of love and support are just a click away.</p>
            <Link to={`${weddingPageLink}/edit`} className='link underline font-medium'><button disabled className='button btn-tertiary underline'>View Wishes</button></Link>
          </div>
          
        </div>
            
        <div className='text-center my-16'>
          <button className='button btn-secondary' onClick={e=>logout(e)}>Logout</button>
        </div>

      
        
        <Footer/>
    </div>
  )
}

export default Dashboard
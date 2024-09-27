import { Link } from 'react-router-dom'
import walimatulRSVPLogo from '../assets/walimatulRSVPLogo.svg'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className='text-center px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
        <img className='mx-auto w-20' src={walimatulRSVPLogo} alt="Walimatul RSVP Logo " />
        <div>
          <h2 className='my-8 font-bold  mx-auto leading-tight sm:w-90' >Create the Perfect Wedding RSVP</h2>
          <p className='mb-2'>Planning your big day? Let us help you make it unforgettable. Create a beautiful and personalized wedding RSVP page that captures the essence of your special day.</p>
          <Link to="/register" className='max-w-fit '><button className='button btn-primary my-2'>GET STARTED ✨</button></Link>
        </div>
        <hr className='my-8'/>
        <div>
          <h4 className='my-4 font-bold subheading'>Why Choose Us?</h4>
          <p className='text-start'><span>Effortless Setup</span>: Our user-friendly interface makes creating your RSVP page a breeze.</p>
          <p className='text-start'><span>Personalized Details</span>: Add your wedding details, including venue, date, time, and more.</p>
          <p className='text-start'><span>Seamless Management</span>: Easily track your guest responses and manage your RSVP list.</p>
        </div>
        <hr className='my-8'/>
        <p className='ps'>Join WalimatulRSVP and start creating your custom wedding RSVP page in just a few clicks. Whether you’re planning a small intimate gathering or a grand celebration, we’ve got you covered.</p>
        <div className='flex flex-col items-center my-4 mb-28'>
          <Link to="/register" className='max-w-fit'><button className=' button btn-primary my-2'>GET STARTED ✨</button></Link>
          <Link to="/login" className='max-w-fit link underline'>Already have an account? Log In </Link>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
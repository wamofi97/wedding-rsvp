import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='mt-5 d-flex flex-column text-center w-100 vh-100'>
        <h4>walimatulRSVP</h4>
        <h2 className='my-4'>Create perfect Wedding RSVP</h2>
        <p>Planning your big day? Let us help you make it unforgettable. Create a beautiful and personalized wedding RSVP page that captures the essence of your special day.</p>
        <hr className='mb-4'/>
        <p className='ps'>Join WalimatulRSVP and start creating your custom wedding RSVP page in just a few clicks. Whether you’re planning a small intimate gathering or a grand celebration, we’ve got you covered.</p>
        <div className='d-flex flex-column mb-4'>
          <Link to="/register"><button className='button btn-primary'>GET STARTED</button></Link>
          <Link to="/login" className='link'>Already have an account? Log In</Link>
        </div>
        <hr />
        <h4 className='my-4'>Why Choose Us?</h4>
        <p className='text-start'><span>Effortless Setup</span>: Our user-friendly interface makes creating your RSVP page a breeze.</p>
        <p className='text-start'><span>Personalized Details</span>: Add your wedding details, including venue, date, time, and more.</p>
        <p className='text-start'><span>Seamless Management</span>: Easily track your guest responses and manage your RSVP list.</p>
        
    </div>
  )
}

export default Home
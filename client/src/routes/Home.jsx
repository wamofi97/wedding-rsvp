import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='d-flex flex-column align-items-center text-center w-100'>
        <h1>Home</h1>
        <h2>Create your wedding RSVP page now!</h2>
        <div>
          <Link to="/login"><button className='btn btn-light mx-2'>Login</button></Link>
          <Link to="/register"><button className='btn btn-primary mx-2'>Register</button></Link>
        </div>
        
    </div>
  )
}

export default Home
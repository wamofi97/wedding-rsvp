import Countdown from '../components/Countdown'
import EventDetails from '../components/EventDetails'
import Aturcara from '../components/Aturcara'
import RSVP from '../components/RSVP'
import Song from '../components/Song'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EntryModal from '../components/EntryModal';
import Contact from '../components/Contact'
import Wishes from '../components/Wishes'
import walimatulRSVPLogo from "../assets/walimatulRSVPLogo.svg"
import Spinner from '../components/Spinner'
import backgroundImage from '../assets/modalbackground.png';
import NotFoundPage from './NotFoundPage'

const WeddingLanding = () => {
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [weddingData, setWeddingData] = useState(null)
  const [program, setProgram] = useState({})
  const [wishes, setWishes] = useState({})
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`)
      if(response.ok){
        setLoading(false)
      }
      const data = await response.json()
      setWeddingData(data)
      document.title = "Walimatul Urus #" + data.wedding_title
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchProgram = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/programs`)
      const data = await response.json()
      setProgram(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const fetchWishes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/wishes`)
      const data = await response.json()
      setWishes(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
    fetchProgram()
    fetchWishes()
  },[])

  const styles = `
  @keyframes fade-in {
    from {
      opacity : 0%;
      // transform : translateY(30%)
    }
    to {
      opacity 100%;
      // translateY(0)
    }
  }
  
  .animate-fade-in {
    animation: fade-in 4s ;
  }

`;
  
  return (
    <div className='w-full overflow-hidden' style={{position: 'relative', minHeight:"100svh", backgroundColor:'#E9E9F0' }}>
        {loading ? 
        <div className="flex gap-2 items-center justify-center px-4 pt-8 pb-4 min-h-svh" style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}>
            <Spinner />
            <p className='text-2xl'>Loading..</p>
        </div> : weddingData ? 
        <EntryModal weddingData={weddingData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> : <NotFoundPage/> }
        
        {!isModalOpen && (
        <div className='px-4 pt-8 pb-4 animate-fade-in'>
          <EventDetails weddingData={weddingData} />
          <Countdown weddingData={weddingData} />
          <Aturcara program={program}/>
          <RSVP weddingData={weddingData}/>
          <Wishes wishes={wishes} setWishes={setWishes}/>
          <Contact />
          <Song />
          <div className="flex flex-col items-center gap-3 w-full " style={{position:'absolute', bottom:'10px', left: '50%', transform: 'translateX(-50%)'}}>
            <p className='ps font-light' style={{marginBottom:'-10px'}}>Dapatkan kad undangan digital anda di</p>
            <Link className="max-w-fit mx-auto" to={'/'}><img  src={walimatulRSVPLogo} alt="walimatulRSVP logo" />  </Link> 
            <p className='ps'>© 2024. Made with <span className='love'>❤</span> by wamofi.dev</p>
          </div>
        </div>
        )}
        <style>{styles}</style>
    </div>
  )
}

export default WeddingLanding
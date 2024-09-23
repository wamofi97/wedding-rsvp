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

const WeddingLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [weddingData, setWeddingData] = useState({})
  const [program, setProgram] = useState({})
  const [wishes, setWishes] = useState({})
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`)
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
  
  return (
    <div className='w-full overflow-hidden' style={{position: 'relative', minHeight:"100vh", backgroundColor:'#E9E9F0'}}>
        <EntryModal weddingData={weddingData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        {!isModalOpen && (
        <div className='px-4 pt-8 pb-4'>
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
    </div>
  )
}

export default WeddingLanding
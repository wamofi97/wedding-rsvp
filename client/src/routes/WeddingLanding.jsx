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
import Footer from '../components/Footer'

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
      const data = await response.json()
      console.log(data)
      setWeddingData(data)
      if(response.ok){
        setLoading(false)
      }
      if(!response.ok){
        setLoading(false)
        return <NotFoundPage />
      }
      document.title = "Walimatul Urus #" + data.wedding_title
      
    } catch (error) {
      console.error("error.message", error.message)
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
    }
    to {
      opacity 100%;
    }
  }
  
  .animate-fade-in {
    animation: fade-in 4s ;
  }

  @keyframes scroll {
      from {
        transform: translateX(-40vw);
        opacity:1%
      }
      to {
        transform: translate(0);
        opacity:100%
      }
    }
    
    .animate-scroll {
      animation: scroll 1.5s ;
    }
`;
  
  return (
    <div className='w-full overflow-hidden bg-slate-100' style={{position: 'relative', minHeight:"100svh" }}>
        {loading ? 
        <div className="flex gap-2 items-center justify-center px-4 pt-8 pb-4 min-h-svh" style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }}>
            <Spinner />
            <p className='text-2xl'>Loading..</p>
            <Footer/>
        </div> : weddingData.message === "Server error" ? <NotFoundPage/> :
        <EntryModal weddingData={weddingData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>  }
        
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
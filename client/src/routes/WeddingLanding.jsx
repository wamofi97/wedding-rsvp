import Countdown from '../components/Countdown'
import EventDetails from '../components/EventDetails'
import Aturcara from '../components/Aturcara'
import RSVPForm from '../components/form/RSVPForm'
import Song from '../components/Song'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EntryModal from '../components/EntryModal';
import Contact from '../components/Contact'

const WeddingLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [weddingData, setWeddingData] = useState({})
  const [program, setProgram] = useState({})
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`)
      const data = await response.json()
      
      setWeddingData(data)
      document.title = "Walimatul Urus, " + data.wedding_title
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

  useEffect(() => {
    fetchData()
    fetchProgram()
  },[])
  
  return (
    <div className='w-100 px-3'>
        <EntryModal weddingData={weddingData} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        {!isModalOpen && (
        <>
          <EventDetails weddingData={weddingData} />
          <Countdown weddingData={weddingData} />
          <Aturcara program={program}/>
          <RSVPForm />
          <Contact />
          <Song />
        </>
        )}
    </div>
  )
}

export default WeddingLanding
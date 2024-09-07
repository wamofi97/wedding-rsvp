import Countdown from '../components/Countdown'
import EventDetails from '../components/EventDetails'
import RSVPForm from '../components/form/RSVPForm'
import Song from '../components/Song'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EntryModal from '../components/EntryModal';

const WeddingLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [weddingData, setWeddingData] = useState({})
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`)
      const data = await response.json()
      console.log(data)
      setWeddingData(data)
      document.title = "Walimatul Urus, " + data.wedding_title
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const closeModal = () => {
    setIsModalOpen(false);
  }
  
  return (
    <div className='w-100 py-5 px-3'>
        <EntryModal weddingData={weddingData} isOpen={isModalOpen} onClose={closeModal} />
        {!isModalOpen && (
        <>
          <EventDetails weddingData={weddingData} />
          <Countdown weddingData={weddingData} />
          <RSVPForm />
          <Song />
        </>
        )}
    </div>
  )
}

export default WeddingLanding
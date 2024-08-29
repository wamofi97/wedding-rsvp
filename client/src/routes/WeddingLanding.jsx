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
      const response = await fetch(`http://localhost:5000/wedding/${id}`)
      const data = await response.json()
      console.log(data)
      setWeddingData(data)
      console.log("wedding data: ", weddingData)
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
    <div>
        <EntryModal isOpen={isModalOpen} onClose={closeModal} />
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
import Countdown from '../components/Countdown'
import EventDetails from '../components/EventDetails'
import RSVPForm from '../components/form/RSVPForm'
import Song from '../components/Song'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const WeddingLanding = () => {
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

  return (
    <div>
        <p>{weddingData.id}</p>
        <EventDetails weddingData={weddingData} />
        {/* <Aturcara /> */}
        <Countdown weddingData={weddingData}/>
        <RSVPForm />
        {/* <Wishes />
        <Contact /> */}
        <Song />
    </div>
  )
}

export default WeddingLanding
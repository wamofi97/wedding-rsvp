import Aturcara from '../components/Aturcara'
import Contact from '../components/Contact'
import Countdown from '../components/Countdown'
import EventDetails from '../components/EventDetails'
import RSVPForm from '../components/form/RSVPForm'
import Wishes from '../components/Wishes'
import Song from '../components/Song'

const Home = () => {
  return (
    <div>
        <EventDetails />
        <Aturcara />
        <Countdown />
        <RSVPForm />
        <Wishes />
        <Contact />
        <Song />
    </div>
  )
}

export default Home
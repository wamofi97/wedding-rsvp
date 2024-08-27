import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Aturcara from './components/Aturcara'
import Contact from './components/Contact'
import Countdown from './components/Countdown'
import EventDetails from './components/EventDetails'
import RSVPForm from './components/form/RSVPForm'
import Wishes from './components/Wishes'
import Song from './components/Song'
import AdminPage from './routes/AdminPage';

function App() {
  
  const weddingDate = "2025-05-10T18:00:00"  
  return (
    <div className='container d-flex gap-5 flex-column align-items-center' style={{ maxWidth: '500px'}}>
      {/* <EventDetails />
      <Aturcara />
      <Countdown weddingDate={weddingDate}/>
      <RSVPForm />
      <Wishes />
      <Contact /> */}
      <Song />
      <AdminPage />
    </div>
  )
}

export default App

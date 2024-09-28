import { useEffect, useState } from "react"
import RSVPForm from './form/RSVPForm'
import { useInView } from "react-intersection-observer";

const RSVP = ({weddingData}) => {
  
  const [threeWeeksEarlier, setThreeWeeksEarlier] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref:inViewRef, inView } = useInView({threshold: 0.5, triggerOnce: true});

  const openRSVP = () => setIsModalOpen(true);
  const closeRSVP = () => setIsModalOpen(false);

  const twoWeeksBefore = (date) => {
    const result = new Date(date);
    result.setDate(date.getDate() - weddingData.rsvp_due_before);
    return result;
  }

  useEffect(()=>{
    if(weddingData){
      const someDate = new Date(weddingData.date)
      const fullDate = twoWeeksBefore(someDate)
      const day = fullDate.getDate();
      const month = fullDate.toLocaleString('default', { month: 'long' });
      const year = fullDate.getFullYear();
      setThreeWeeksEarlier(`${day} ${month} ${year}`);
    }
  },[weddingData])


  return (
    <div className='w-full text-center p-12 bg-opacity-10 bg-slate-400'>
      <div ref={inViewRef} className= {inView ? "animate-scroll" : "opacity-0"}>
        <h5 className='font-medium mb-4 text-rose-950'>Maklumat kehadiran</h5>
        <p className="mb-2">Sila RSVP kehadiran anda dengan menekan butang RSVP dibawah sebelum <span className="font-semibold">{threeWeeksEarlier}</span></p> 
        <button className="button wedding-primary m-2" onClick={openRSVP}>RSVP</button>
        <RSVPForm isOpen={isModalOpen} onClose={closeRSVP} />
      </div>
    </div>
  )
}

export default RSVP
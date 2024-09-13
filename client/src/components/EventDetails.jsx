import { useEffect, useState } from "react"

const EventDetails = ({weddingData}) => {
  const [formattedDate, setFormattedDate] =  useState("")
  const [formattedTime, setFormattedTime] =  useState("")
  const [groom, setGroom] = useState({
    firstName:'',
    lastName:''
  })
  const [bride, setBride] = useState({
    firstName:'',
    lastName:''
  })

  useEffect(() => {
    if (weddingData && weddingData.time) {
      // Your existing logic for formatting the time
      const dateStr = weddingData.date;
      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      
      setFormattedDate(`${day} ${month} ${year}`);
      
      const timeStr = weddingData.time
      const [hours, minutes] = timeStr.split(':');

      let hours12 = parseInt(hours, 10);
      const period = hours12 >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour format if needed
      if (hours12 > 12) {
          hours12 -= 12;
      } else if (hours12 === 0) {
          hours12 = 12; // Handle midnight (00:00) as 12:00 AM
      }
      // Format the time as "20.36PM"
      setFormattedTime(`${hours}.${minutes}${period}`);
      }
      setGroom({...groom, 
        firstName: weddingData.groom_name.firstName, 
        lastName: weddingData.groom_name.lastName 
      })
      setBride({...bride, 
        firstName:weddingData.bride_name.firstName, 
        lastName: weddingData.bride_name.lastName 
      })
    
  },[weddingData])

  return (
    <div className='w-full text-center'>
        <p>Assalamualaikum & Salam Sejahtera, kami</p>
        <div className="my-4">
          <h2 className="names" style={{fontSize: '20px'}}>{weddingData.father_name}</h2>
          <h6 className="font-normal">&</h6>
          <h2 className="names" style={{fontSize: '20px'}}>{weddingData.mother_name}</h2>
        </div>
        
        <p>Dengan penuh rasa kesyukuran kami ingin menjemput Tuan/Puan/Encik/Cik ke majlis perkahwinan ini</p>
        <div className="my-8">
          <h2 className="names" style={{fontSize: '24px'}}>{groom.firstName}</h2>
          <h2 className="names" style={{fontSize: '22px'}}>{groom.lastName}</h2>
          <h6>&</h6>
          <h2 className="names" style={{fontSize: '24px'}}>{bride.firstName}</h2>
          <h2 className="names" style={{fontSize: '22px'}}>{bride.lastName}</h2>
        </div>
        <p className="pr">Pada Tarikh</p>
        <p className="uppercase font-medium mb-4">{formattedDate}</p>
        <p className="pr">Bertempat Di</p>
        <p className="uppercase font-medium mb-4">{weddingData.location}</p>
        <p className="pr">Masa</p>
        <p className="uppercase font-medium">{formattedTime}</p>
        <hr className='my-12 h-1 bg-neutral-500 opacity-10 mx-auto'/>
    </div>
  )
}

export default EventDetails
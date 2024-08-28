import { useEffect, useState } from "react"

const EventDetails = ({weddingData}) => {
  const [formattedDate, setFormattedDate] =  useState("")
  const [formattedTime, setFormattedTime] =  useState("")

  useEffect(() => {
    if (weddingData && weddingData.wedding_time) {
      // Your existing logic for formatting the time
      const dateStr = weddingData.wedding_date;
      const date = new Date(dateStr);
      console.log(weddingData.wedding_date)
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      
      setFormattedDate(`${day} ${month} ${year}`);
      
      console.log(weddingData.wedding_time)
      const timeStr = weddingData.wedding_time
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
    
  },[weddingData])
  // if(weddingData){

  return (
    <div className='d-flex flex-column align-items-center text-center w-100'>
        <p>Assalamualaikum & Salam Sejahtera</p>
        <h2>{weddingData.father_name}</h2>
        <h2>{weddingData.mother_name}</h2>
        <p>Dengan penuh rasa kesyukuran kami ingin menjemput Tuan/Puan/Encik/Cik ke majlis Perkahwinan ini</p>
        <h1>{weddingData.groom_name}</h1>
        <h1>{weddingData.bride_name}</h1>
        <p>Pada Tarikh</p>
        <h3>{formattedDate}</h3>
        <p>Bertempat Di</p>
        <h3>{weddingData.location}</h3>
        <p>Masa</p>
        <h3>{formattedTime}</h3>
        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    
    </div>
  )
}

export default EventDetails
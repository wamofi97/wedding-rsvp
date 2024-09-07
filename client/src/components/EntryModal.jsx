import { useEffect, useState } from "react";
import backgroundImage from '../assets/modalbackground.png';

const EntryModal = ({weddingData, isOpen, onClose }) => {
  const [formattedDate, setFormattedDate] =  useState("")
  const [groomName, setGroomName] = useState("")
  const [brideName, setBrideName] = useState("")

  useEffect(() => {
    if (weddingData && weddingData.time) {
        const dateStr = weddingData.date;
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        setFormattedDate(`${day} ${month} ${year}`);
        setGroomName(weddingData.groom_name.firstName)
        setBrideName(weddingData.bride_name.firstName)
      }
    },[weddingData])
  if (!isOpen) return null;


  return (
      <div className="modal-content d-flex flex-column justify-content-center" style={{
        height: '100vh',
        borderRadius: "5px",
        textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}>
        <h6 className="bilbo-swash-caps-regular">Walimatul Urus</h6>
        <h6 style={{fontSize:'20px'}}>MAJLIS PERKAHWINAN</h6>
        <div className="my-5">
          <h5 className="names">{groomName}</h5>
          <h3 className='mt-2'>&</h3>
          <h5 className="names">{brideName}</h5>
          <h6>{formattedDate}</h6>
        </div>
      
        {/* <h6 className="bilbo-swash-caps-regular">Walimatul Urus</h6>
        <h6 style={{fontSize:'20px'}}>MAJLIS PERKAHWINAN</h6>
        <div className="my-5">
          <h5 className="names">{weddingData.groom_name.firstName}</h5>
          <h3 className='mt-2'>&</h3>
          <h5 className="names">{weddingData.bride_name.lastName}</h5>
          <h6>{formattedDate}</h6>
        </div> */}
        
        <p className="quote">“Dan kami menciptakan kamu secara berpasang-pasangan”</p>
        <p className="quote">-- Surah An-Naba 78:8 --</p>
        <button className='button btn-primary' style={{margin: '0 auto'}} onClick={onClose}>Enter</button>
      </div>
  );
};

export default EntryModal;

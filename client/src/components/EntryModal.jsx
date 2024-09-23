import { useEffect, useState } from "react";
import backgroundImage from '../assets/modalbackground.png';
import Footer from "./Footer";

const EntryModal = ({weddingData, isOpen, setIsModalOpen }) => {
  const [formattedDate, setFormattedDate] =  useState("")
  const [groomName, setGroomName] = useState("")
  const [brideName, setBrideName] = useState("")
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      }
    },[weddingData])
  if (!isOpen) return null;

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const styles = `
  @keyframes fade-up {
    from {
      opacity : 0%;
      transform : scale(0.8)
    }
    to {
      opacity 100%;
      transform : scale(1)
    }
  }
  
  .animate-fade-up {
    animation: fade-up 3s ;
  }

`;

  return (
      <div className="flex flex-col text-center px-4 pt-8 pb-4 min-h-screen " style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}>
        <div className="animate-fade-up">
          <div className="my-8">
            <h6 className="bilbo-swash-caps-regular ">Walimatul Urus</h6>
            <h6 className="font-normal" style={{fontSize:'20px', color: '#800020'}}>MAJLIS PERKAHWINAN</h6>
          </div>
          
          <div className="">
            {loading ? <h5 className="opacity-0">Groom Name</h5> : <h5 className="names ">{ groomName}</h5>}
            <h3 className='mt-2 font-normal '>&</h3>
            <h5 className="names leading-tight mb-8 ">{brideName}</h5>
            <h6 className='clash-display uppercase mb-12 tracking-widest font-normal'>{formattedDate}</h6>
          </div>
          
          <p className="quote w-80 mx-auto mb-2">“Dan kami menciptakan kamu secara berpasang-pasangan”</p>
          <p className="quote mb-8">-- Surah An-Naba 78:8 --</p>
          <div className="mb-20">
            <button className='button wedding-primary transition duration-300' style={{margin: '0 auto'}} onClick={closeModal}>Enter</button>
          </div>
        </div>
        <Footer/>
        <style>{styles}</style>
      </div>
  );
};

export default EntryModal;

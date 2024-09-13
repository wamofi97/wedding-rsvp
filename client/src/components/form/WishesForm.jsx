import { useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useParams } from 'react-router-dom';

const WishesForm = ({isOpen, onClose, wishes, setWishes}) => {
    const modalRef = useRef();

    const [wishData, setWishData] = useState({
      name: "",
      message: ""
    });

    const {name, message} = wishData

    const { id } = useParams();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
          }
        };
  
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
  
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const submissionData = {
        name,
        message
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/wishes` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData)
        })
        const data = await response.json()
        console.log(data)
        setWishes((prevWishes) => [submissionData, ...prevWishes])
        setWishData({name: "", message: ""})
      } catch (error) {
        console.error(error.message)
      }

    }

    
    const handleChange = (e) => {
      setWishData((prevWishData) => 
        ({...prevWishData, [e.target.name]: e.target.value }))
  }

  return (
    <div className='w-full fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center'>
        <div ref={modalRef} className="p-6 rounded-lg shadow-lg relative max-w-md w-full" style={{backgroundColor:'#E9E9F0'}}>
          <h5>Hantar Ucapan</h5>
          <button onClick={onClose} className='absolute top-0 right-0 m-2 text-3xl'><IoClose/></button>
          <form onSubmit={handleSubmit}>
                <label className='pr block mb-1 text-start' htmlFor="name">Nama <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100" type="text" name='name' placeholder='Nama anda' value={name} onChange={(e) => handleChange(e)}/>
                </label>
                
                <label className='pr block mb-1 text-start' htmlFor="message">Ucapan</label>
                <textarea className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100 text-sm" name='message' placeholder='Ucapan anda ' value={message} onChange={(e) => handleChange(e)}></textarea>

                <button type="submit" className='button wedding-primary'>Submit</button>
          </form>
        </div>
    </div>
  )
}

export default WishesForm
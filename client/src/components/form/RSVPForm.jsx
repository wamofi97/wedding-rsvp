import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Spinner from '../Spinner';

const RSVPForm = ({isOpen, onClose}) => {
    const modalRef = useRef();
    const successRef = useRef()

    const [successData, setSuccessData] = useState()
    const [rsvpData, setRSVPData] = useState({
      name: "",
      relationship: "Keluarga/Saudara",
      attendance: true,
      number: 1,
    });
    const {name, relationship, attendance, number} = rsvpData

    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        const submissionData = {
          name,
          relationship,
          attendance,
          number: attendance ? number : 0
        };
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/rsvps` , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData)
          })
          if(response.ok){
            successRef.current.style.display = "block"
            setLoading(false)
            const data = await response.json()
            console.log(data)
            setRSVPData({name: "",
            relationship: "Keluarga/Saudara",
            attendance: true,
            number: 1})
            setSuccessData(data)
          }
        } catch (error) {
          console.error(error.message)
        }
    }
      
    const handleChange = (e) => {
      if (e.target.name === 'attendance') {
        const isAttending = e.target.value === 'true';
        setRSVPData(prevData => ({
          ...prevData,
          attendance: isAttending,
          number: isAttending ? prevData.number : 1  // Reset to 1 if switching back to attending
        }));
      } else {
        setRSVPData(prevData => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }
    };

      const addNumber = () => {
        if(number<20){
          setRSVPData((prevRSVPData) => 
            ({...prevRSVPData, number: parseInt(number + 1)}))
        }
      }

      const minusNumber = () => {
        if(number>1){
          setRSVPData((prevRSVPData) => 
            ({...prevRSVPData, number: parseInt(number - 1)}))
        }
      }

      const ok = () =>{
        successRef.current.style.display = "none"
        onClose()
      }
      
  return (
    <div className='w-full fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center'>
        <div ref={modalRef} className="p-6 rounded-lg shadow-lg relative max-w-md w-full" style={{backgroundColor:'#E9E9F0'}}>
          <h5>RSVP</h5>
          <button onClick={onClose} className='absolute top-0 right-0 m-2 text-3xl'><IoClose/></button>
          <form onSubmit={handleSubmit}>
              <label className='pr block mb-1 text-start' htmlFor="name">Nama <input required className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100" type="text" name='name' id='name' placeholder='Nama anda' value={name} onChange={(e) => handleChange(e)}/>
              </label>

              <label className='pr block mb-1 text-start' htmlFor="relationship">Hubungan </label>
              <select required className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100 text-sm" style={{fontFamily:'Montserrat'}} name="relationship" id="relationship" value={relationship} onChange={(e) => handleChange(e)}>
                  <option value="Keluarga/Saudara">Keluarga/Saudara</option>
                  <option value="Rakan">Rakan</option>
                  <option value="Jiran">Jiran</option>
              </select>

              {/* <label className='pr block mb-1 text-start' htmlFor="attendance">Kehadiran</label>
              <select className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100 text-sm" style={{fontFamily:'Montserrat'}} name="attendance" id="attendance" value={attendance} onChange={(e) => handleChange(e)}>
                  <option value={true}>✅ Hadir</option>
                  <option value={false}>❌ Tidak hadir</option>
              </select> */}
              
              <label className='pr block mb-1 text-start' htmlFor="attendance">Kehadiran</label>
              <div className='flex'>
                <div className='flex p-2' style={{fontFamily:'Montserrat'}}>
                  <input className='hidden peer' type="radio" name="attendance" id="hadir" value={true} onChange={(e) => handleChange(e)} required defaultChecked/>
                  <label className='w-full text-start px-6 py-2 cursor-pointer bg-slate-100 border-2 rounded-lg border-gray-300 peer-checked:border-blue-500' htmlFor="hadir">✅ Hadir</label>
                </div>
                <div className='flex p-2' style={{fontFamily:'Montserrat'}}>
                  <input className='hidden peer' type="radio" name="attendance" id="tidakhadir" value={false} onChange={(e) => handleChange(e)}/>
                  <label className='w-full text-start px-2 py-2 cursor-pointer bg-slate-100 border-2 rounded-lg border-gray-300 peer-checked:border-blue-500' htmlFor="tidakhadir">❌ Tidak hadir</label>
                </div>
              </div>
        
              {attendance && 
              (<div >
                  <label className='pr block mb-1 text-start' htmlFor="number">Jumlah </label>
                  <div className='w-full flex gap-3'>
                    <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100" type="number" name="number" id="number" placeholder='Masukkan jumlah' min={1} max={20} value={number} onChange={(e) => handleChange(e)}/>
                    <p onClick={minusNumber} className='cursor-pointer text-lg bg-slate-100 h-9 w-10 p-2  rounded-lg'> <FaMinus /></p>
                    <p onClick={addNumber} className='cursor-pointer text-lg bg-slate-100 h-9 w-10 p-2  rounded-lg text'> <FaPlus /></p>
                  </div>
              </div>)
            }

              <button type="submit" className='button wedding-primary'>{loading ? 
                <div className="flex items-center gap-2">
                  <Spinner/>
                  <p className="pr">Submitting..</p>
                </div> : "Submit"}</button>
          </form>
        </div>
        <div ref={successRef} className='fixed left-0 top-0 bg-black bg-opacity-80 z-10' style={{display:'none', height:'100vh', width: '100%'}}>
              <div className='bg-white flex flex-col items-center p-4 bg-[f4f4f4] rounded-xl text-center max-w-[450px] mx-auto m-[50vh] translate-y-[-50%]' >
                <p className='text-4xl my-2 text-green-500'><FaRegCheckCircle /></p>
                <p className='my-2'>RSVP anda berjaya dihantar!</p>
                <div className='bg-slate-200 sm:w-64 w-full p-2 text-start '>
                  <p className='pr'>ID : {successData?.id} </p>
                  <p className='pr'>Nama : {successData?.guest_name} </p>
                  <p className='pr'>Hubungan : {successData?.relationship} </p>
                  <p className='pr'>Kehadiran : {successData?.attendance ? "Hadir" : "Tidak Hadir"} </p>
                  <p className='pr'>{successData?.attendance &&  `Jumlah Pax : ${successData?.number}`}</p>
                </div>
                <p className='ps'>Sila &apos;screenshot&apos; untuk simpan & maklumkan kepada pihak majlis jika ada perubahan.</p>
                <button onClick={ok} className='button btn-secondary mt-2'>OK</button>
              </div>
        </div> 
    </div>
  )
}

export default RSVPForm
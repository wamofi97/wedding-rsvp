import { useNavigate } from 'react-router-dom';
import AturcaraForm from '../components/form/AturcaraForm';
import EventForm from '../components/form/EventForm'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import walimatulRSVPLogo from '../assets/walimatulRSVPLogo.svg'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const CreateWedding = ({setAuth}) => {
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventDetails : {
      weddingTitle: "",
      fatherName: "",
      motherName: "",
      bride: {
        firstName: "",
        lastName: "",
      },
      groom: {
        firstName: "",
        lastName: "",
      },
      location: "",
      googlemapcode: "",
      date: "",
      time: "",
    },
    program: [{ time: '', activity: '' }],
});

const{ eventDetails, program } = formData

const nextStep = () => {
  setStep(step + 1);
};

const prevStep = () => {
  setStep(step - 1);
};

  const fetchName = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      console.log("test", data)
      setName(data.username)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchName()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
            weddingTitle : eventDetails.weddingTitle,
            fatherName: eventDetails.fatherName,
            motherName: eventDetails.motherName,
            bride: JSON.stringify(eventDetails.bride),
            groom: JSON.stringify(eventDetails.groom),
            location: eventDetails.location,
            googlemapcode: eventDetails.googlemapcode,
            date: eventDetails.date,
            time: eventDetails.time,
        })
      });
      const data = await response.json();
      console.log("Wedding created with ID:", data.user_id);

      const programResponse = await fetch(`${import.meta.env.VITE_API_URL}/wedding/programs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.token
        },
        body: JSON.stringify({ program }),
      });
      const programs = await programResponse.json()
      console.log(programs)

      navigate('/dashboard')
    } catch (error) {
      console.error("Error creating wedding", error);
    }
  };

  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
    // toast.success("Logout successfully!")
  }

  return (
    <div className='w-full px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
        <img className='mx-auto w-20' src={walimatulRSVPLogo} alt="Walimatul RSVP Logo " />
        <h4 className='text-center my-4'>Let's Personalize Your Wedding RSVP Page</h4>
        <p className='ps text-center'>You’re just a few steps away from creating a beautiful and personalized RSVP page for your special day. Fill In the details to make It uniquely yours.</p>
        <hr className="my-8"/>
        {/* <p className='text-center my-4'>💓💗💗💗</p> */}

        {step === 1 && <EventForm formData={formData} setFormData={setFormData}/>}
        {step === 2 && <AturcaraForm formData={formData} setFormData={setFormData}/>}
        {/* <ToastContainer /> */}
        <div className='flex justify-end gap-2 my-8'>
          {step > 1 && <button type="button" className='button btn-secondary' onClick={prevStep}>Back</button>}
          {step < 2 && <button type="button" className='button btn-primary' onClick={nextStep}>Next</button>}
          {step === 2 && <button type="submit" className='button btn-primary' onClick={handleSubmit}>Submit</button>}
        </div>
        <button className='button btn-secondary' onClick={e=>logout(e)}>Logout</button>
        <Footer/>
    </div>
  )
}

export default CreateWedding
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../components/Footer'

const EditWedding = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    wedding_title: "",
    father_name: "",
    mother_name: "",
    bride_name: { firstName: "", lastName: "" },
    groom_name: { firstName: "", lastName: "" },
    location: "",
    googlemapcode: "",
    date: "",
    time: "",
    program: [{ time: '', activity: '' }]
  })

  const {
    wedding_title, father_name,  mother_name, bride_name, groom_name, location, googlemapcode, date, time, program } = inputs

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const eventData = await response.json()
      const datePart = eventData.date.split('T')[0];
      // console.log("data", eventData)

      const programResponse = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/programs`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const programData = await programResponse.json()
      // console.log(programData)
      setInputs((prevInputs) => ({
        ...prevInputs, 
        ...eventData, 
        date : datePart,
        program : programData.programs
      }))
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleAddActivities = () => {
    setInputs(prevInputs => ({
      ...prevInputs,
      program: [...prevInputs.program, { time: '', activity: '' }]
    }));
  };

  const handleRemoveActivities = (index) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      program: prevInputs.program.filter((activity, i) => i !== index)
    }));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      program: prevInputs.program.map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");  // Handle nested fields

    if (keys.length === 2) {
      setInputs((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const eventResponse = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.token
            },
            body: JSON.stringify({
                wedding_title, 
                father_name, 
                mother_name, 
                bride_name, 
                groom_name, 
                location, 
                googlemapcode, 
                date, 
                time
            })
        });

        const programResponse = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/programs/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.token
            },
            body: JSON.stringify({program})
        });

        if (programResponse.ok && eventResponse.ok) {
            const eventData = await eventResponse.json();
            const programData = await programResponse.json();
            console.log('Wedding updated: ', eventData);
            console.log('Program updated: ', programData);
            navigate("/dashboard")
        }
    } catch (error) {
        console.error('Error updating wedding', error);
    }
  }
  return (
      <div className='w-full px-8 pt-8 pb-4' style={{position: 'relative', minHeight:"100vh"}}>
          <h4 className="">Event Details</h4>
          <form >
              <label htmlFor="weddingTitle">Wedding Title</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={wedding_title} name="wedding_title" placeholder="Title Wedding Anda"/>

              <label htmlFor="fatherName">Nama Bapa</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={father_name} name="father_name" placeholder="Nama Bapa"/>

              <label htmlFor="motherName">Nama Ibu</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={mother_name} name="mother_name" placeholder="Nama Ibu"/>

              <label>Nama Pengantin 1 (groom)</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={groom_name?.firstName || ""} name="groom_name.firstName" placeholder="First Name"/>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={groom_name?.lastName || ""} name="groom_name.lastName" placeholder="Last Name"/>

              <label>Nama Pengantin 2 (bride)</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={bride_name?.firstName || ""} name="bride_name.firstName" placeholder="First Name"/>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={bride_name?.lastName || ""} name="bride_name.lastName" placeholder="Last Name"/>

              <label>Tempat</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={location} name="location"/>

              <label>Link Lokasi Google Map</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} value={googlemapcode} name="googlemapcode"/>

              <label>Tarikh</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="date" onChange={handleChange} value={date} name="date"/>

              <label>Masa</label>
              <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="time" onChange={handleChange} value={time} name="time"/>
            </form>

            <h4 className="">Aturcara</h4>
            <form onSubmit={handleSubmit} className="mb-20" >
                <div className='w-full'>
                    <label className='text-start mr-24 '>Masa</label>
                    <label className='text-start'>Aktiviti</label>
                    <label ></label>
                </div>
              
                {program.map((activity, index) => (
                <div key={index}>
                    <div className='flex gap-1 items-stretch w-full'>
                      <input
                          className="w-32 px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg"
                          type="time"
                          name="time"
                          value={activity.time}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder='Masa'
                          required
                      />
                      <input
                          className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg"
                          type="text"
                          name="activity"
                          value={activity.activity}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Enter activity"
                          required
                      />
                      {program.length > 1 && <button type="button" className='btn-remove' onClick={() => handleRemoveActivities(index)}>-</button>
                        }
                    </div>
                </div>
                ))}

                <div className='flex justify-center mb-4'>
                    <button type="button" onClick={handleAddActivities} className='btn-add w-9 h-9 leading-5' style={{fontSize:"2em"}}>+</button>
                </div> 
                <button type="submit" className="button btn-primary mx-auto">Save</button>
            </form>
            <Footer/>
        </div>
  )
}

export default EditWedding
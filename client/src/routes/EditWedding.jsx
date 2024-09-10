import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import AturcaraForm from '../components/form/AturcaraForm'
// import EventForm from "../components/form/EventForm";

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
        <div className='d-flex flex-column w-100 py-5 px-3' style={{minHeight:"94vh"}}>
            <h2 className="">Event Details</h2>
            <form >
                <label htmlFor="weddingTitle">Wedding Title</label>
                <input type="text" onChange={handleChange} value={wedding_title} name="wedding_title" placeholder="Title Wedding Anda" className="form-control" />

                <label htmlFor="fatherName">Nama Bapa</label>
                <input type="text" onChange={handleChange} value={father_name} name="father_name" placeholder="Nama Bapa" className="form-control" />

                <label htmlFor="motherName">Nama Ibu</label>
                <input type="text" onChange={handleChange} value={mother_name} name="mother_name" placeholder="Nama Ibu" className="form-control" />

                <label>Nama Pengantin 1 (groom)</label>
                <input type="text" onChange={handleChange} value={groom_name?.firstName || ""} name="groom_name.firstName" placeholder="First Name" className="form-control" />
                <input type="text" onChange={handleChange} value={groom_name?.lastName || ""} name="groom_name.lastName" placeholder="Last Name" className="form-control" />

                <label>Nama Pengantin 2 (bride)</label>
                <input type="text" onChange={handleChange} value={bride_name?.firstName || ""} name="bride_name.firstName" placeholder="First Name" className="form-control" />
                <input type="text" onChange={handleChange} value={bride_name?.lastName || ""} name="bride_name.lastName" placeholder="Last Name" className="form-control" />

                <label>Tempat</label>
                <input type="text" onChange={handleChange} value={location} name="location" className="form-control" />

                <label>Link Lokasi Google Map</label>
                <input type="text" onChange={handleChange} value={googlemapcode} name="googlemapcode" className="form-control" />

                <label>Tarikh</label>
                <input type="date" onChange={handleChange} value={date} name="date" className="form-control" />

                <label>Masa</label>
                <input type="time" onChange={handleChange} value={time} name="time" className="form-control" />
            
                
            </form>

            <h2 className="">Aturcara</h2>
            <form onSubmit={handleSubmit} >

                <table className='w-100'>
                  <thead>
                    <tr>
                        <th style={{width: "20%"}}>Masa</th>
                        <th style={{width: "50%"}}>Aktiviti</th>
                        <th style={{width: "20%"}}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {program.map((activity, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="time"
                            name="time"
                            value={activity.time}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder='Masa'
                            required
                            className='form-control'
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="activity"
                            value={activity.activity}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Enter activity"
                            required
                            className='form-control'
                          />
                        </td>
                        <td>
                          <button type="button" onClick={handleAddActivities} className='btn btn-info'>+</button>
                          {program.length > 1 && <button type="button" className='btn btn-danger' onClick={() => handleRemoveActivities(index)}>-</button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
            
          
          {/* <AturcaraForm /> */}
      </div>
  )
}

export default EditWedding
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AturcaraForm from '../components/form/AturcaraForm'
import EventForm from "../components/form/EventForm";

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
  })

  const {
    wedding_title, 
    father_name, 
    mother_name, 
    bride_name, 
    groom_name, 
    location, 
    googlemapcode, 
    date, 
    time } = inputs

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      const datePart = data.date.split('T')[0];
      console.log("data", data)
      setInputs((prevInputs) => ({
        ...prevInputs, 
        ...data, 
        date : datePart
      }))
      console.log("this is inputs", inputs)
      
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

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
        const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/edit`, {
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

        if (response.ok) {
            const data = await response.json();
            console.log('Wedding updated: ', data);
            navigate("/dashboard")
        }
    } catch (error) {
        console.error('Error updating wedding', error);
    }
  }
  return (
        <div className='d-flex flex-column w-100 py-5 px-3' style={{minHeight:"95vh"}}>
            <h2 className="">Event Details</h2>
            <form onSubmit={handleSubmit} >
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
            
                <button type="submit" className="btn btn-success">Save</button>
            </form>
            
          
          {/* <AturcaraForm /> */}
      </div>
  )
}

export default EditWedding
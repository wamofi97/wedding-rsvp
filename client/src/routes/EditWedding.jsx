import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWedding = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    wedding_title: "",
    father_name: "",
    mother_name: "",
    bride_name: "",
    groom_name: "",
    location: "",
    googlemapcode: "",
    wedding_date: "",
    wedding_time: ""
  })

  const {wedding_title, father_name, mother_name, bride_name, groom_name, location, googlemapcode, wedding_date, wedding_time} = inputs

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      const datePart = data.wedding_date.split('T')[0];
      console.log("data", data)
      setInputs((prevInputs) => ({
        ...prevInputs, 
        ...data, 
        wedding_date : datePart
      }))
      console.log("inputs", inputs)
      
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  },[])
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                wedding_date,
                wedding_time
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
        <div className='d-flex flex-column align-items-center w-100'>
          <h2>Event Details</h2>
          <form onSubmit={handleSubmit} className='w-100'>
              <table className="w-100">
                  <tbody>
                      <tr >
                          <td >
                              <label htmlFor="wedding_title">Wedding Title</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={wedding_title} id='wedding_title' placeholder='Title Wedding Anda' className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="father_name">Nama Bapa</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={father_name} id='father_name' placeholder='Nama Bapa' className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="mother_name">Nama Ibu</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={mother_name} id='mother_name' placeholder='Nama Ibu' className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="groom_name">Nama Pengantin 1(groom)</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={groom_name} id='groom_name' className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="bride_name">Nama Pengantin 2(bride)</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={bride_name} id='bride_name' className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="location">Tempat</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={location} id="location" className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="googlemapcode">Link Lokasi Google Map</label>
                          </td>
                          <td>
                              <input type="text" onChange={e => handleChange(e)} value={googlemapcode} id="googlemapcode" className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="wedding_date">Tarikh</label>
                          </td>
                          <td>
                              <input type="date" onChange={e => handleChange(e)} value={wedding_date} id="wedding_date" className='form-control'/>
                          </td>
                      </tr>
                      <tr >
                          <td >
                              <label htmlFor="wedding_time">Masa</label>
                          </td>
                          <td>
                              <input type="time" onChange={e => handleChange(e)} value={wedding_time} id="wedding_time" className='form-control'/>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <button type='submit' className='btn btn-success'>Save</button>

          </form>
      </div>
  )
}

export default EditWedding
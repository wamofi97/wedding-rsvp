import { useState, } from "react"
import { useNavigate } from "react-router-dom"

const EventForm = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        weddingTitle: "",
        fatherName: "",
        motherName: "",
        brideName: "",
        groomName: "",
        location: "",
        googlemapcode: "",
        date: "",
        time: ""
      })

    const {weddingTitle, fatherName, motherName, brideName, groomName, location, googlemapcode, date, time} = inputs
    
    const handleChange = (e) => {
        setInputs({...inputs, [e.target.id] : e.target.value})
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.token
                },
                body: JSON.stringify({
                    weddingTitle,
                    fatherName, 
                    motherName, 
                    brideName, 
                    groomName, 
                    location, 
                    googlemapcode, 
                    date, 
                    time
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Wedding created with ID:', data.weddingId);
                // You can redirect or show a success message here
                navigate("/dashboard")

            } else {
                console.error('Failed to create wedding', response.statusText);
            }
        } catch (error) {
            console.error('Error creating wedding', error);
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
                            <label htmlFor="weddingTitle">Wedding Title</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id='weddingTitle' placeholder='Title Wedding Anda' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="fatherName">Nama Bapa</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id='fatherName' placeholder='Nama Bapa' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="motherName">Nama Ibu</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id='motherName' placeholder='Nama Ibu' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="groomName">Nama Pengantin 1(groom)</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id='groomName' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="brideName">Nama Pengantin 2(bride)</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id='brideName' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="location">Tempat</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id="location" className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="googlemapcode">Link Lokasi Google Map</label>
                        </td>
                        <td>
                            <input type="text" onChange={e => handleChange(e)} id="googlemapcode" className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="date">Tarikh</label>
                        </td>
                        <td>
                            <input type="date" onChange={e => handleChange(e)} id="date" className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="time">Masa</label>
                        </td>
                        <td>
                            <input type="time" onChange={e => handleChange(e)} id="time" className='form-control'/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type='submit' className='btn btn-success'>Save</button>

        </form>
    </div>
  )
}

export default EventForm
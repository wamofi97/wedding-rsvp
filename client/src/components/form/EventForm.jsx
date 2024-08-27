
const EventForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('/api/event', formData);
          // Show success message
        } catch (error) {
          // Handle error
        }
      };

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>Event Details</h2>
        <form onSubmit={handleSubmit} className='w-100'>
            <table className="w-100">
                <tbody>
                    <tr >
                        <td >
                            <label htmlFor="father-name">Nama Bapa</label>
                        </td>
                        <td>
                            <input type="text" id='father-name' placeholder='Nama Bapa' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="mother-name">Nama Ibu</label>
                        </td>
                        <td>
                            <input type="text" id='mother-name' placeholder='Nama Ibu' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="male-name">Nama Pengantin 1(male)</label>
                        </td>
                        <td>
                            <input type="text" id='male-name' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="female-name">Nama Pengantin 2(female)</label>
                        </td>
                        <td>
                            <input type="text" id='female-name' className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="date">Tarikh</label>
                        </td>
                        <td>
                            <input type="date" id="date" className='form-control'/>
                        </td>
                    </tr>
                    <tr >
                        <td >
                            <label htmlFor="time">Masa</label>
                        </td>
                        <td>
                            <input type="time" id="time" className='form-control'/>
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
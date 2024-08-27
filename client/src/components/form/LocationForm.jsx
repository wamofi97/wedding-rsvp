
const LocationForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('/api/location', formData);
          // Show success message
        } catch (error) {
          // Handle error
        }
      };
  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>Lokasi</h2>
        <form onSubmit={handleSubmit} className='w-100'>
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="place">Nama Tempat</label>
                  </td>
                  <td>
                  <input type="text" id="place" name="place" className="form-control"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="googlemapcode">Kod Google Map</label>
                  </td>
                  <td>
                    <input type="text" id="googlemapcode" name="googlemapcode" className="form-control"/>
                  </td>
                </tr>
              </tbody>
            </table>  
            <button type="submit" className='btn btn-success'>Save</button>
        </form>
    </div>
  )
}

export default LocationForm
import { useState } from 'react'

const RSVPForm = () => {
    const [formData, setFormData] = useState({ name: '', hubungan: '', kehadiran: '', jumlah: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('/api/rsvp', formData);
          // Show success message
        } catch (error) {
          // Handle error
        }
      };
    
  return (
    <div className='d-flex flex-column align-items-center text-center w-100'>
        <h2>RSVP</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nama <input type="text" placeholder='name'/>
            </label>
            <br />
            <label htmlFor="hubungan">Hubungan </label>
            <select name="hubungan" id="hubungan">
                <option value="Keluarga/Saudara">Keluarga/Saudara</option>
                <option value="Rakan">Rakan</option>
                <option value="Jiran">Jiran</option>
            </select>
            <br />
            <label htmlFor="jumlah">Jumlah </label>
            <input type="number" name="jumlah" id="jumlah" placeholder='Masukkan jumlah'/>
        </form>
        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    </div>
  )
}

export default RSVPForm
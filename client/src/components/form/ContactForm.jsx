import { useState } from 'react'

const ContactForm = () => {
    const [contacts, setContacts] = useState([{ name: '', phonenum: '' }]);

    const handleAddContacts = () => {
      setContacts([...contacts, { name: '', phonenum: '' }]);
    };
  
    const handleRemoveContacts = (index) => {
      const values = [...contacts];
      values.splice(index, 1);
      setContacts(values);
    };
  
    const handleInputChange = (index, event) => {
      const values = [...contacts];
      values[index][event.target.name] = event.target.value;
      setContacts(values);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Submitted Form (contact):', contacts);
      // Handle form submission
    };
  
    return (
      <div className='d-flex flex-column align-items-center w-100'>
            <h2>Contact</h2>
            <form onSubmit={handleSubmit} className='w-100'>
              <table className='w-100 table'>
                <thead>
                  <tr>
                    <th style={{width: "30%"}}>Nama</th>
                    <th style={{width: "50%"}}>No. Telefon</th>
                    <th style={{width: "20%"}}></th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={index}>
                      <td>
                        <input
                            type="text"
                            name="name"
                            value={contact.name}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder='Enter name'
                            required
                            className='form-control'
                        />
                      </td>
                      <td>
                        <input
                            type="tel"
                            name="phonenum"
                            value={contact.phonenum}
                            onChange={(event) => handleInputChange(index, event)}
                            placeholder="Enter phone number"
                            required
                            className='form-control'
                          />
                      </td>
                      <td>
                        <button type="button" onClick={handleAddContacts} className='btn btn-info'>+</button>
                        {contacts.length > 1 && <button type="button" className='btn btn-danger' onClick={() => handleRemoveContacts(index)}>-</button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="submit" className='btn btn-success'>Save</button>
            </form>
      </div>
      
    );
}

export default ContactForm
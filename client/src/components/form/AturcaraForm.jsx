import { useState } from 'react';

const AturcaraForm = ({ formData, setFormData }) => {

  const handleAddActivities = () => {
    setFormData(prevData => ({
      ...prevData,
      program: [...prevData.program, { time: '', activity: '' }]
    }));
  };

  const handleRemoveActivities = (index) => {
    setFormData(prevData => ({
      ...prevData,
      program: prevData.program.filter((activity, i) => i !== index)
    }));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      program: prevData.program.map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    }));
  };

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>Aturcara</h2>
        <form className='w-100'>
            <table className='w-100'>
              <thead>
                <tr>
                    <th style={{width: "20%"}}>Masa</th>
                    <th style={{width: "50%"}}>Aktiviti</th>
                    <th style={{width: "20%"}}></th>
                </tr>
              </thead>

              <tbody>
                {formData.program.map((activity, index) => (
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
                      {formData.program.length > 1 && <button type="button" className='btn btn-danger' onClick={() => handleRemoveActivities(index)}>-</button>
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
};




export default AturcaraForm;

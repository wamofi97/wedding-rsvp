import { useState } from 'react';

const AturcaraForm = () => {
  const [activities, setActivities] = useState([{ time: '', activity: '' }]);

  const handleAddActivities = () => {
    setActivities([...activities, { time: '', activity: '' }]);
  };

  const handleRemoveActivities = (index) => {
    const values = [...activities];
    values.splice(index, 1);
    setActivities(values);
  };

  const handleInputChange = (index, e) => {
    const values = [...activities];
    values[index][e.target.name] = e.target.value;
    setActivities(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form(aturcara):', activities);
    // Handle form submission
  };

  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>Aturcara</h2>
        <form onSubmit={handleSubmit} className='w-100'>
            <table className='w-100'>
              <thead>
                <tr>
                    <th style={{width: "20%"}}>Masa</th>
                    <th style={{width: "50%"}}>Aktiviti</th>
                    <th style={{width: "20%"}}></th>
                </tr>
              </thead>

              <tbody>
                {activities.map((activity, index) => (
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
                      {activities.length > 1 && <button type="button" className='btn btn-danger' onClick={() => handleRemoveActivities(index)}>-</button>
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

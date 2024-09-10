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
    <div className='w-full'>
        <h5 className="mb-2">Aturcara</h5>
        <form className='w-full'>
                <div className='w-full'>
                    <label className='text-start mr-24 '>Masa</label>
                    <label className='text-start'>Aktiviti</label>
                    <label ></label>
                </div>
              
                {formData.program.map((activity, index) => (
                <div key={index}>
                    <div className='flex gap-1 w-full'>
                      <input
                          className="w-32 px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg"
                          type="time"
                          name="time"
                          value={activity.time}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder='Masa'
                          required
                      />
                      <input
                          className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg"
                          type="text"
                          name="activity"
                          value={activity.activity}
                          onChange={(e) => handleInputChange(index, e)}
                          placeholder="Enter activity"
                          required
                      />
                      {formData.program.length > 1 && <button type="button" className='btn-remove' onClick={() => handleRemoveActivities(index)}>-</button>
                        }
                    </div>
                </div>
                ))}

                <div className='flex gap-1 justify-center mb-4'>
                    <button type="button" onClick={handleAddActivities} className='btn-add w-9 h-9 leading-5' style={{fontSize:"2em"}}>+</button>
                </div>
        </form>
    </div>
    
  );
};




export default AturcaraForm;

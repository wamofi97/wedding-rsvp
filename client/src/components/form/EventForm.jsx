import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventForm = ({ formData, setFormData }) => {
    const {eventDetails} = formData

    const handleChange = (e) => {
      const { name, value } = e.target;
      const keys = name.split(".");
  
      setFormData(prevData => {
        const newEventDetails = { ...prevData.eventDetails };
  
        if (keys.length === 2) {
          if (keys[1] === "firstName"){
            newEventDetails[keys[0]] = {
              ...newEventDetails[keys[0]],
              [keys[1]]: value,
              displayName: value,
          }}

          newEventDetails[keys[0]] = {
            ...newEventDetails[keys[0]],
            [keys[1]]: value,
            
          };
        } else {
          newEventDetails[name] = value;
        }
  
        return {
          ...prevData,
          eventDetails: newEventDetails,

        };
      });
    };

  return (
    <div className="w-full">
      <h5 className="mb-2">Event Details</h5>
      <form className="w-full">
        <label className='pr block mb-1 text-start' htmlFor="weddingTitle">Wedding Title</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg"  type="text" onChange={handleChange} name="weddingTitle" value={eventDetails.weddingTitle || ""} placeholder="Title Wedding Anda"/>

        <label className='pr block mb-1 text-start' htmlFor="fatherName">Nama Bapa</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="fatherName" value={eventDetails.fatherName || ""} placeholder="Nama Bapa"/>

        <label className='pr block mb-1 text-start' htmlFor="motherName">Nama Ibu</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="motherName" value={eventDetails.motherName || ""} placeholder="Nama Ibu"/>

        <label className='pr block mb-1 text-start'>Nama Pengantin 1 (groom)</label>
        <div className="flex gap-1 flex-wrap">
          <input className="w-50 px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="groom.firstName" value={eventDetails.groom?.firstName || ""} placeholder="First Name"/>
          <input className="w-48 px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="groom.lastName" value={eventDetails.groom?.lastName || ""} placeholder="Last Name"/>
        </div>
        

        <label className='pr block mb-1 text-start'>Nama Pengantin 2 (bride)</label>
        <div className="flex gap-1 flex-wrap">
          <input className="w-50 w- px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="bride.firstName" value={eventDetails.bride?.firstName || ""} placeholder="First Name"/>
          <input className="w-48 px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="bride.lastName" value={eventDetails.bride?.lastName || ""} placeholder="Last Name"/>
        </div>

        <label className='pr block mb-1 text-start'>Tempat</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="location" placeholder="Nama Tempat" value={eventDetails.location || ""}/>

        <label className='pr block mb-1 text-start'>Link Lokasi Google Map</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="text" onChange={handleChange} name="googlemapcode" placeholder="e.g https://maps.app.goo.gl/8VgTyD6YGM27vg3e9" value={eventDetails.googlemapcode || ""}/>

        <label className='pr block mb-1 text-start'>Tarikh</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="date" onChange={handleChange} name="date" value={eventDetails.date || ""}/>

        <label className='pr block mb-1 text-start'>Masa</label>
        <input className="w-full px-4 py-2 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent form-bg" type="time" onChange={handleChange} name="time" value={eventDetails.time || ""}/>

      </form>
    </div>
  );
};

export default EventForm;

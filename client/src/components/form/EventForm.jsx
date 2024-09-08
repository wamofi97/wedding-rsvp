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
    <div className="d-flex flex-column align-items-center w-100">
      <h2>Event Details</h2>
      <form  className="w-100">
        <label htmlFor="weddingTitle">Wedding Title</label>
        <input type="text" onChange={handleChange} name="weddingTitle" value={eventDetails.weddingTitle || ""} placeholder="Title Wedding Anda" className="form-control" />

        <label htmlFor="fatherName">Nama Bapa</label>
        <input type="text" onChange={handleChange} name="fatherName" value={eventDetails.fatherName || ""} placeholder="Nama Bapa" className="form-control" />

        <label htmlFor="motherName">Nama Ibu</label>
        <input type="text" onChange={handleChange} name="motherName" value={eventDetails.motherName || ""} placeholder="Nama Ibu" className="form-control" />

        <label>Nama Pengantin 1 (groom)</label>
        <input type="text" onChange={handleChange} name="groom.firstName" value={eventDetails.groom?.firstName || ""} placeholder="First Name" className="form-control" />
        <input type="text" onChange={handleChange} name="groom.lastName" value={eventDetails.groom?.lastName || ""} placeholder="Last Name" className="form-control" />

        <label>Nama Pengantin 2 (bride)</label>
        <input type="text" onChange={handleChange} name="bride.firstName" value={eventDetails.bride?.firstName || ""} placeholder="First Name" className="form-control" />
        <input type="text" onChange={handleChange} name="bride.lastName" value={eventDetails.bride?.lastName || ""} placeholder="Last Name" className="form-control" />

        <label>Tempat</label>
        <input type="text" onChange={handleChange} name="location" value={eventDetails.location || ""} className="form-control" />

        <label>Link Lokasi Google Map</label>
        <input type="text" onChange={handleChange} name="googlemapcode" value={eventDetails.googlemapcode || ""} className="form-control" />

        <label>Tarikh</label>
        <input type="date" onChange={handleChange} name="date" value={eventDetails.date || ""} className="form-control" />

        <label>Masa</label>
        <input type="time" onChange={handleChange} name="time" value={eventDetails.time || ""} className="form-control" />

      </form>
    </div>
  );
};

export default EventForm;

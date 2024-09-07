import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    weddingTitle: "",
    fatherName: "",
    motherName: "",
    bride: {
      firstName: "",
      lastName: "",
    },
    groom: {
      firstName: "",
      lastName: "",
    },
    location: "",
    googlemapcode: "",
    date: "",
    time: "",
  });

  const {
    weddingTitle,
    fatherName,
    motherName,
    bride,
    groom,
    location,
    googlemapcode,
    date,
    time,
  } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");  // Handle nested fields

    if (keys.length === 2) {
      setInputs((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
            weddingTitle,
            fatherName,
            motherName,
            bride,
            groom,
            location,
            googlemapcode,
            date,
            time,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Wedding created with ID:", data.weddingId);
        navigate("/dashboard");
      } else {
        console.error("Failed to create wedding", response.statusText);
      }
    } catch (error) {
      console.error("Error creating wedding", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h2>Event Details</h2>
      <form onSubmit={handleSubmit} className="w-100">
        <label htmlFor="weddingTitle">Wedding Title</label>
        <input type="text" onChange={handleChange} name="weddingTitle" placeholder="Title Wedding Anda" className="form-control" />

        <label htmlFor="fatherName">Nama Bapa</label>
        <input type="text" onChange={handleChange} name="fatherName" placeholder="Nama Bapa" className="form-control" />

        <label htmlFor="motherName">Nama Ibu</label>
        <input type="text" onChange={handleChange} name="motherName" placeholder="Nama Ibu" className="form-control" />

        <label>Nama Pengantin 1 (groom)</label>
        <input type="text" onChange={handleChange} name="groom.firstName" placeholder="First Name" className="form-control" />
        <input type="text" onChange={handleChange} name="groom.lastName" placeholder="Last Name" className="form-control" />

        <label>Nama Pengantin 2 (bride)</label>
        <input type="text" onChange={handleChange} name="bride.firstName" placeholder="First Name" className="form-control" />
        <input type="text" onChange={handleChange} name="bride.lastName" placeholder="Last Name" className="form-control" />

        <label>Tempat</label>
        <input type="text" onChange={handleChange} name="location" className="form-control" />

        <label>Link Lokasi Google Map</label>
        <input type="text" onChange={handleChange} name="googlemapcode" className="form-control" />

        <label>Tarikh</label>
        <input type="date" onChange={handleChange} name="date" className="form-control" />

        <label>Masa</label>
        <input type="time" onChange={handleChange} name="time" className="form-control" />

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default EventForm;

import React from 'react'
import EventForm from '../components/form/EventForm'
import AturcaraForm from '../components/form/AturcaraForm'
import ContactForm from '../components/form/ContactForm'
import LocationForm from '../components/form/LocationForm'

const AdminPage = () => {
  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h1>ADMIN PAGE</h1>
        <h2>Welcome username!</h2>
        <EventForm />
        <AturcaraForm />
        <ContactForm />
        <LocationForm />
        
    </div>
  )
}

export default AdminPage
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ManageRSVP = () => {
  const [rsvpData, setRsvpData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRsvp, setFilteredRsvp] = useState([]);
  const {id} = useParams()
  const [rsvpDue, setRsvpDue] = useState("")
  const rsvpdueRef = useRef()
  const attending = rsvpData.filter((rsvp) => rsvp.attendance === true);

  const fetchRSVP = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/rsvps`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      setRsvpData(data)
      setFilteredRsvp(data)
      console.log(data)
      setRsvpDue(data[0]?.rsvp_due_before)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(()=>{
    fetchRSVP()
  },[])

  useEffect(() => {
    if (rsvpData.length > 0 ){
      const filtered = rsvpData.filter(rsvp =>
        rsvp?.guest_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRsvp(filtered);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const editDue = () =>{
    rsvpdueRef.current.style.display = "block"
  }

  const close = () =>{
    rsvpdueRef.current.style.display = "none"
  }

  const handleChange = (e) => {
      setRsvpDue( e.target.value)
    }
  

  return (
    <div className='sm:px-8 px-1 pt-8 pb-4 sm:w-full w-fit flex flex-col' style={{position: 'relative', minHeight:"100vh", backgroundColor:'#FFFFF0'}}>
      <h4 className="text-center">Manage RSVP</h4>

      <div className="mt-2 p-4 shadow-lg bg-gray-400 bg-opacity-5 rounded-xl ">
        <h6>RSVP Due Date</h6>
        <div className="flex items-center gap-2">
          <p>RSVP due date is <span>{rsvpDue/7} weeks</span>  <span className="font-medium">({rsvpDue} days)</span> before the wedding date.</p>
          <button onClick={editDue} className="flex items-center gap-2 underline rounded-lg p-2 text-lg hover:text-yellow-600 "><p className="hidden sm:block font-medium">Edit</p><FaRegEdit />
          </button>
        </div>
        <div ref={rsvpdueRef} className='fixed left-0 top-0 bg-black bg-opacity-30 z-10' style={{display:"none", height:'100vh', width: '100%'}}>
          <div className="shadow-lg bg-white flex flex-col items-center p-4 bg-[f4f4f4] rounded-xl text-center max-w-80 mx-auto m-[50vh] -translate-y-[50%] py-6">
            <button onClick={close} className='absolute top-0 right-0 m-2 text-3xl'><IoClose/></button>
            <p className="font-bold">Change RSVP due date</p>
            <div className="my-4 flex flex-col gap-2">
              <select className="p-2 rounded-lg" name="due" id="due" value={rsvpDue} onChange={(e) => handleChange(e)}>
                <option value="7">1 week</option>
                <option value="14">2 weeks</option>
                <option value="21">3 weeks</option>
                <option value="28">1 month</option>
                <option value="56">2 months</option>
              </select>
              <p className="pr">(before wedding date)</p>
            </div>
            <button type="submit" className="button btn-primary">Save</button>
          </div>
        </div>
      </div>

      <div className="my-4 p-4 shadow-lg bg-gray-400 bg-opacity-5 rounded-xl">
        <h6>RSVP Data</h6>
        <div className="flex flex-col">
          <p>Total response: {rsvpData.length}</p>
          <p>Total attending: {attending.length}</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mb-40">
        <input
          type="text"
          placeholder="Search names..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 m-2 w-full mx-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-slate-100"
        />
        <table className="overflow-x-scroll">
          <thead>
            <tr>
              <th className="text-start">ID</th>
              <th className="text-start">Name</th>
              <th className="text-start">Relationship</th>
              <th className="text-start">Attendance</th>
              <th className="text-start">Amount</th>
            </tr>
          </thead>
          <tbody>
            {!rsvpData ? <h6>Loading...</h6> : filteredRsvp.map((rsvp) => {
              return(
              <tr key={rsvp.id} className="text-start pr">
                <td>{rsvp.id}</td>
                <td>{rsvp.guest_name}</td>
                <td>{rsvp.relationship}</td>
                <td className="text-center">{rsvp.attendance ? "Yes" : "No"}</td>
                <td className="text-center">{rsvp.number}</td>
              </tr>
              )
            }) }
          </tbody>
        </table>
      </div>

      

      
      <Footer />
    </div>
  )
}

export default ManageRSVP
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"


const ManageRSVP = () => {
  const [rsvpData, setRsvpData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRsvp, setFilteredRsvp] = useState([]);
  const {id} = useParams()

  const fetchRSVP = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wedding/${id}/rsvps`, {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })
      
      const data = await response.json()
      console.log(data)
      setRsvpData(data)
      setFilteredRsvp(data)
      console.log("rsvpData", rsvpData)
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

  return (
    <div className='sm:px-8 px-1 pt-8 pb-4 sm:w-full w-fit flex flex-col items-center' style={{position: 'relative', minHeight:"100vh", backgroundColor:'#FFFFF0'}}>
      <h4 className="text-center">Manage RSVP</h4>
      <input
        type="text"
        placeholder="Search names..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />
      <table className="overflow-x-scroll">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Relationship</th>
            <th>Attendance</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {!rsvpData ? <h6>Loading...</h6> : filteredRsvp.map((rsvp) => {
            return(
            <tr key={rsvp.id} className="text-start">
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
      <Footer />
    </div>
  )
}

export default ManageRSVP
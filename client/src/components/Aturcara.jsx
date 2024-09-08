import {  useEffect, useState } from "react"

const Aturcara = ({program}) => {
    
    return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>ATURCARA</h2>
            {program &&
                program.programs.map((program) => {
                return (
                    <div key={program.activity} className="d-flex justify-content-start w-100">
                        <p className="px-4">{program.time}</p>
                        <p className="px-2">{program.activity}</p>
                    </div>
                )})
            }

        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    </div>
  )
}

export default Aturcara
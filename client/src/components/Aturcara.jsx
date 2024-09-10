import {  useEffect, useState } from "react"

const Aturcara = ({program}) => {
    
    return (
    <div className='w-full'>
        <h5>ATURCARA</h5>
            {program &&
                program.programs.map((program) => {
                    const separateTime = (program.time).split(":");
                    const ampm = separateTime[0] > 11 ? "PM" : "AM"; 
                    return (
                        <div key={program.activity} className="d-flex justify-content-start w-100">
                            <p className="px-4">{program.time} <strong>{ampm}</strong></p>
                            <p className="px-2">{program.activity}</p>
                        </div>
                )})
            }

        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    </div>
  )
}

export default Aturcara
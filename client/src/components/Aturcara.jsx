const Aturcara = ({program}) => {
    
    return (
    <div className='w-full p-12'>
        <h5 className="font-medium mb-4 text-center text-rose-950" >Aturcara</h5>
        {program &&
            program.programs.map((program) => {
                const separateTime = (program.time).split(":");
                const ampm = separateTime[0] > 11 ? "PM" : "AM"; 
                return (
                <div key={program.activity} className="flex flex-col items-center mb-8">
                    <p className="">{program.time} {ampm}:</p>
                    <p className="capitalize font-medium text-center">{program.activity}</p>
                </div>
                )})
        }
        
    </div>
  )
}

export default Aturcara
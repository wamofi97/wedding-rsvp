import { useInView } from "react-intersection-observer";

const Aturcara = ({program}) => {

    const { ref:inViewRef, inView } = useInView({threshold: 0.5, triggerOnce: true});
    
        const separateTime = (time) => {
        const [hours, minutes] = time.split(":");
        return [hours, minutes];
    }

    return (
    <div  className= "w-full p-12">
        <div ref={inViewRef} className= {inView ? "animate-scroll" : "opacity-0"}>
            <h5 className="font-medium mb-4 text-center text-rose-950" >Aturcara</h5>
            {program &&
                program.programs.map((program) => {
                    const [hours, minutes] = separateTime(program.time);
                    const ampm = hours > 11 ? "PM" : "AM"; 
                    return (
                    <div key={program.activity} className="flex flex-col items-center mb-8">
                        <p className="">{hours}:{minutes} {ampm}:</p>
                        <p className="capitalize font-medium text-center">{program.activity}</p>
                    </div>
                    )})
            }
        </div>
    </div>
  )
}


export default Aturcara
import { FaWhatsapp } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";


const Contact = () => {
  const { ref:inViewRef, inView } = useInView({threshold: 0.5, triggerOnce: true});
  return (
    <div className='w-full text-center p-12 mb-40 bg-opacity-10 bg-slate-400'>
      <div ref={inViewRef} className= {inView ? "animate-scroll" : "opacity-0"}>
        <h5 className='font-medium mb-4 text-rose-950'>Hubungi</h5>
        <div className='w-full flex flex-col items-center mb-8 gap-4'>
            <div className='flex items-center w-96 px-14 sm:px-1'>
                <p className="w-3/5 text-start font-medium">Firdaus</p>
                <div className='w-2/5 flex gap-3 sm:gap-6 justify-end'>
                    <a href="tel:+60168901297" className="text-2xl wedding-primary rounded-3xl p-3" ><IoCallOutline /></a>
                    <a href="https://wa.me/60168901297" target='blank' className="text-2xl wedding-primary rounded-3xl p-3"><FaWhatsapp /></a>
                </div>
            </div>
        </div>

        <p >Semoga dengan kehadiran anda dapat memeriahkan lagi majlis kami.</p>
      </div>
    </div>
  )
}

export default Contact
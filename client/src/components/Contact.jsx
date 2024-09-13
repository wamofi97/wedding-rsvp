import { FaWhatsapp } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";


const Contact = () => {
  return (
    <div className='w-full text-center'>
        <h5 className='font-medium mb-4'>Hubungi</h5>
        <div className='w-full flex flex-col items-center mb-8 gap-4'>
            <div className='flex items-center w-96 px-14 sm:px-1'>
                <p className="w-3/5 text-start font-medium">Firdaus</p>
                <div className='w-2/5 flex gap-3 sm:gap-6 justify-end'>
                    <a href="tel:+60168901297" className="text-2xl wedding-primary rounded-3xl p-3" ><IoCallOutline /></a>
                    <a href="https://wa.me/60168901297" target='blank' className="text-2xl wedding-primary rounded-3xl p-3"><FaWhatsapp /></a>
                </div>
            </div>
            {/* <div className='flex w-80 text-start gap-20'>
                <p className="w-2/3 clash-display">Adik</p>
                <div className='flex gap-4'>
                    <a href="" className="text-2xl"><IoCallOutline /></a>
                    <a href="" className="text-2xl"><FaWhatsapp /></a>
                </div>
            </div>
            <div className='flex w-80 text-start gap-20'>
                <p className="w-2/3 clash-display">Kakak</p>
                <div className='flex gap-4'>
                    <a href="" className="text-2xl"><IoCallOutline /></a>
                    <a href="" className="text-2xl"><FaWhatsapp /></a>
                </div>
            </div> */}
        </div>

        <p className="mb-40">Semoga dengan kehadiran anda dapat memeriahkan lagi majlis kami.</p>
    </div>
  )
}

export default Contact
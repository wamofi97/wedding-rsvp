import { Link } from "react-router-dom"
import walimatulRSVPLogo from "../assets/walimatulRSVPLogo.svg"

const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-3 w-full " style={{position:'absolute', bottom:'10px', left: '50%', transform: 'translateX(-50%)'}}>
        <Link className="max-w-fit mx-auto" to={'/'}><img  src={walimatulRSVPLogo} alt="walimatulRSVP logo" />  </Link> 
        <p className='ps'>© 2024. Made with <span className='love'>❤</span> by wamofi.dev</p>
    </div>
  )
}

export default Footer


import { Link } from "react-router-dom"
import walimatulRSVPLogo from "../assets/walimatulRSVPLogo.svg"

const Footer = () => {
  return (
    <div className="pt-5 flex flex-col items-center gap-3" style={{position:'relative', bottom:'0'}}>
        <Link className="max-w-fit mx-auto" to={'/'}><img  src={walimatulRSVPLogo} alt="walimatulRSVP logo" />  </Link> 
        <p className='ps'>© 2024. Made with <span className='love'>❤</span> by wamofi.dev</p>
    </div>
  )
}

export default Footer


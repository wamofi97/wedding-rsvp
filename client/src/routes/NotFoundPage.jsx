import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="text-center px-4 pt-8 pb-4 min-h-screen ">
      <h3>Page Not Found</h3>
      <Link to={"/"} className="link linkyellow underline" >Back to Home</Link>
    </div>
  )
}

export default NotFoundPage
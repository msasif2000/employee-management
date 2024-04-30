import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import bn from "../src/assets/image/banner.jpg"

function App() {

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${bn})` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-[500px]">
          <h1 className="mb-5 text-4xl font-bold">Welcome to Employee Management!</h1>
          <div className="flex items-center justify-center">
            <Link to="/dashboard/departments">
              <button className="btn bg-sl1 border-sl1 hover:bg-sl1 px-4 py-1 rounded font-bold flex items-center gap-1 justify-center">DashBoard <BsFillArrowUpRightCircleFill className="text-xl"/></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

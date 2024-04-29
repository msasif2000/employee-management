import { BsFillArrowUpRightCircleFill } from "react-icons/bs"; 
import { Link } from "react-router-dom"


function App() {

  return (
    <div className="h-screen">
      <h2 className="flex items-center justify-center text-center w-full text-4xl font-bold pt-20">Welcome to Employee Management!</h2>
      <div className="flex items-center justify-center my-12">
        <Link to="/dashboard/departments">
          <button className="btn bg-bg1 px-4 py-1 rounded font-bold flex items-center gap-1 justify-center">DashBoard <BsFillArrowUpRightCircleFill /></button>
        </Link>
      </div>
    </div>
  )
}

export default App

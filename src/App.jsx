import { BsFillArrowUpRightCircleFill } from "react-icons/bs"; 
import { Link } from "react-router-dom"


function App() {

  return (
    <>
      <h2 className="flex items-center justify-center text-center w-full h-full text-4xl font-bold mt-20">Welcome to Employee Management!</h2>
      <div className="flex items-center justify-center my-12">
        <Link to="/dashboard/departments">
          <button className="btn bg-[#FFDD90] px-4 py-1 rounded font-bold flex items-center gap-1 justify-center">DashBoard <BsFillArrowUpRightCircleFill /></button>
        </Link>
      </div>
    </>
  )
}

export default App

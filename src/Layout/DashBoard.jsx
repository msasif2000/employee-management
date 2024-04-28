import { NavLink, Outlet } from "react-router-dom";


const DashBoard = () => {
    const Links = <>
        <li>
            <NavLink to="/dashboard/departments">Departments</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/designations">Designations</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/timeSheet">Timesheet</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/shiftSchedule">Shift & Schedule</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/overtime">Overtime</NavLink>
        </li>
    </>
    return (
        <div>
            <div className="md:flex">
                <div className="lg:w-2/11 xl:max-w-[20rem] 2xl:w-[22rem] border-r">
                    {/* === Mobile Menu */}
                    <div className="dash navbar-start lg:hidden">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="red"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </label>

                            <ul
                                tabIndex={0}
                                className=" menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-600 rounded-box  w-52 "
                            >
                                {Links}
                            </ul>
                        </div>
                    </div>

                    {/* === Large Screen Menu */}
                    <div className="dash hidden lg:flex lg:flex-col lg:justify-between min-h-screen  lg:sticky  lg:top-0 lg:inset-x-0 lg:z-20 ">
                        <div>
                            <h3 className="text-3xl font-bold text-center">
                                Dash<span className="text-[#af914a]">board</span>
                            </h3>
                            <div className="divider mt-[0.7rem]"></div>
                            <ul className="menu text-xl ">{Links}</ul>
                        </div>
                        <div>
                            <div className="divider mx-4"></div>
                            <ul className="menu text-xl">
                                <li>
                                    <NavLink to="/">
                                      Home
                                    </NavLink>
                                </li>
                            </ul>
                            <h6 className="text-center capitalize text-xs text-gray-300 border-t-2 mx-4">
                             Dashboard
                            </h6>
                        </div>
                    </div>
                </div>

                <div className="md:flex-1 bg-[#FAFAFA]">
                    <div className="px-6 pb-6">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
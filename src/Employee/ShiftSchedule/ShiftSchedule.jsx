import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import DashHeader from "../../Components/DashHeader/DashHeader";
import DataNumber from "../../Components/DataNumber/DataNumber";
import { useNavigate } from "react-router-dom";

const ShftSchedule = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [timeSheet, setTimeSheet] = useState([]);

    const navigate = useNavigate();
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal2 = () => {
        setIsModalOpen2(true);
    };
    const closeModal2 = () => {
        setIsModalOpen2(false);
    };
    const handleShift = () => {
        navigate("/dashboard/shifts")
    }


    const closeEditModal = () => {
        setEditModal(false);
    };


    const closeDeleteModal = () => {
        setDeleteModal(false);
    };



    useEffect(() => {
        fetch("/timesheet.json")
            .then((res) => res.json())
            .then((data) => {
                setTimeSheet(data);
            });
    }, []);



    return (
        <div>
            <div className="py-2 flex items-center justify-between">
                <DashHeader title="Shift Scheduling" />
                <div className="flex gap-4">
                    <a href="#dept-modal" onClick={openModal}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Assign Shfts</button>
                    </a>
                    <a onClick={handleShift}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Shfts</button>
                    </a>
                </div>
            </div>

            <div className="mt-4">
                <form className="flex items-center gap-8">
                    <div className="w-full h-12">
                        <input type="text" name="deptName" id="deptName" placeholder="Employee" required className="w-full border rounded-lg p-2 text-base h-full" />
                    </div>
                    <div className="w-full">
                        <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2 h-12">
                            <option value="">Select Department</option>
                            <option value="1">IT Infrastructure</option>
                            <option value="2">Network Security</option>
                            <option value="3">Mobile App Development</option>
                            <option value="4">Data Analysis Platform</option>
                        </select>
                    </div>
                    <div className="w-full h-12 relative">
                        <label htmlFor="deptName" className="block text-sm font-semibold text-txt1 absolute pl-2">From</label>
                        <input type="date" name="deptName" id="deptName" required className="w-full border rounded-lg p-2 h-full" />
                    </div>

                    <div className="w-full h-12 relative">
                        <label htmlFor="deptName" className="block text-sm font-semibold text-txt1 absolute pl-2">To</label>
                        <input type="date" name="deptName" id="deptName" placeholder="To" required className="w-full border rounded-lg p-2 h-full" />
                    </div>
                    <div className="h-12">
                        <button type="submit" className="bg-bs2 hover:bg-bg1 font-bold py-2 px-4 rounded-lg h-full">Search</button>
                    </div>
                </form>
            </div>

            {/*data selection*/}
            <DataNumber />

            {/* Departments Table */}
            <div className="">
                <div className="overflow-x-auto pt-12">
                    <table className="table min-w-full divide-y divide-red-500 ">
                        {/* head */}
                        <thead>
                            <tr className="bg-bg1 text-sm font-bold text-center">
                                <th>SCHEDULED SHIFT</th>
                                <th>SAT 4</th>
                                <th>SUN 5</th>
                                <th>MON 6</th>
                                <th>TUE 7</th>
                                <th>WED 8</th>
                                <th>THU 9</th>
                                <th>FRI 10</th>
                            </tr>
                        </thead>
                        {/* body */}
                        <tbody>
                            {timeSheet?.map((tmsh, index) => (
                                <tr key={tmsh.id} className={index % 2 === 0 ? 'bg-ic1' : 'bg-bg1'}>
                                    <td style={{ whiteSpace: 'nowrap' }} className="flex items-center gap-1">
                                        <img src={tmsh?.image} alt="" className="h-12 w-12 rounded-full" />
                                        <span className="text-base font-bold w-full pr-1">{tmsh.name}</span>
                                        <span className="text-txt1">{tmsh?.dsgn}</span>
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[0]?.date1.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[0]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[0]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[1]?.date2.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[1]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[1]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[2]?.date3.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[2]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[2]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[3]?.date4.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[3]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[3]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[4]?.date5.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[4]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[4]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[5]?.date6.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[5]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[5]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                    <td >
                                        {
                                            tmsh?.shfts[6]?.date7.length > 0 ? (
                                                <div onClick={openModal2} className="p-1 border-2 border-dashed border-txt2">
                                                    <p className="flex gap-1"><span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[6]?.st}</span> - <span style={{ whiteSpace: 'nowrap' }}>{tmsh?.shfts[6]?.et}</span></p>
                                                    <p style={{ whiteSpace: 'nowrap' }}>{tmsh?.project}</p>
                                                </div>
                                            ) :
                                                (
                                                    <div onClick={openModal} className="flex justify-center mx-auto">
                                                        <span className="p-1 border-2 border-dashed border-txt2"><BiPlus className="text-xl" /></span>
                                                    </div>
                                                )
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Department Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Assign Shift</h2>
                            <a href="#close" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="flex gap-8">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Department</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">IT Infrastructure</option>
                                        <option value="2">Network Security</option>
                                        <option value="3">Mobile App Development</option>
                                        <option value="4">Data Analysis Platform</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Select Employee</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">John Maya</option>
                                        <option value="2">Jane Smith</option>
                                        <option value="3">Michael Johnson</option>
                                        <option value="4">Emily Brown</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-8 mt-4">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Date</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Shfts</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">10:30 Shift</option>
                                        <option value="2">Daily Shift</option>
                                        <option value="3">Nes Shift</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Min Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Max Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Min End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Max End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="w-1/2 mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Break Time</label>
                                <input type="time" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                            </div>

                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Accept Extra Hours</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </label>
                            </div>
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Publish</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </label>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Department Modal */}
            {isModalOpen2 && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Edit Shift</h2>
                            <a href="#close" onClick={closeModal2}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="flex gap-8">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Department</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">IT Infrastructure</option>
                                        <option value="2">Network Security</option>
                                        <option value="3">Mobile App Development</option>
                                        <option value="4">Data Analysis Platform</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Select Employee</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">John Maya</option>
                                        <option value="2">Jane Smith</option>
                                        <option value="3">Michael Johnson</option>
                                        <option value="4">Emily Brown</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-8 mt-4">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Date</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Shfts</label>
                                    <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                        <option value="">Select</option>
                                        <option value="1">10:30 Shift</option>
                                        <option value="2">Daily Shift</option>
                                        <option value="3">Nes Shift</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Min Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Max Start Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Min End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full mt-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Max End Time</label>
                                    <input type="time" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="w-1/2 mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Break Time</label>
                                <input type="time" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                            </div>

                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Accept Extra Hours</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </label>
                            </div>
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Publish</span>
                                    <input type="checkbox" className="toggle toggle-primary" checked />
                                </label>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit  Modal */}
            {editModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 w-1/3 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Edit Department</h2>
                            <a href="#close" onClick={closeEditModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Select Employee</label>
                                <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                    <option value="">Select</option>
                                    <option value="1">IT Infrastructure</option>
                                    <option value="2">Network Security</option>
                                    <option value="3">Mobile App Development</option>
                                    <option value="4">Data Analysis Platform</option>
                                </select>
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Overtime Date</label>
                                <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Overtime Hours</label>
                                <input type="text" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Description</label>
                                <textarea name="desc" id="desc" required className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Department Modal */}
            {deleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 w-1/3 rounded-lg">
                        <div className="">
                            <h2 className="text-2xl font-bold text-txt2">Delete Overtime?</h2>
                            <div className="flex items-center justify-center gap-12 pt-8">
                                <a href="#close" onClick={closeDeleteModal}>
                                    <button className="btn btn-sm bg-white border-1 border-bs2 hover:bg-sl1 hover:text-white">Delete</button>
                                </a>
                                <a href="#close" onClick={closeDeleteModal}>
                                    <button className="btn btn-sm bg-white border-1 border-bs2 hover:bg-sl1 hover:text-white">Cancel</button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};


export default ShftSchedule;
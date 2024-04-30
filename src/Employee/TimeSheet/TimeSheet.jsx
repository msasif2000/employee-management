import { useEffect, useState } from "react";
import DashHeader from "../../Components/DashHeader/DashHeader";
import DataNumber from "../../Components/DataNumber/DataNumber";


const TimeSheet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editDept, setEditDept] = useState('');
    const [timeSheet, setTimeSheet] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = () => {
        setEditModal(true);
    };
    const closeEditModal = () => {
        setEditModal(false);
    };

    const openDeleteModal = () => {
        setDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    const [showMenu, setShowMenu] = useState(null);

    const handleMenuClick = (index, dept) => {
        setShowMenu(index === showMenu ? null : index);
        setEditDept(dept);
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
                <DashHeader title="Time Sheet" />
                <div>
                    <a href="#dept-modal" onClick={openModal}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">+ Add Today Work</button>
                    </a>
                </div>
            </div>

            {/*data selection*/}
            <DataNumber />

            {/* Departments Table */}
            <div className="">
                <div className="overflow-x-auto pt-12">
                    <table className="table min-w-full divide-y divide-red-500 ">
                        {/* head */}
                        <thead>
                            <tr className="bg-white text-sm font-bold text-black">
                                <th>NAME</th>
                                <th>DATE</th>
                                <th>PROJECT</th>
                                <th>ASSIGNED HOURS</th>
                                <th>HOURS</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {/* body */}
                        <tbody>
                            {timeSheet?.map((tmsh, index) => (
                                <tr key={tmsh.id} className={index % 2 === 0 ? '' : 'bg-white'}>
                                    <td style={{ whiteSpace: 'nowrap' }} className="flex items-center gap-1 w-full pr-1">
                                        <img src={tmsh?.image} alt="" className="h-12 rounded-full w-12" />
                                        <span className="text-base font-bold">{tmsh.name}</span>
                                        <span className="text-slate-700">{tmsh?.dsgn}</span>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.date}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.project}</td>
                                    <td>{tmsh.assh}</td>
                                    <td>{tmsh.hours}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.desc}</td>
                                    <td>
                                        <div className="relative">
                                            <button className="" onClick={() => handleMenuClick(index, tmsh?.hours)}>
                                                <svg
                                                    className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M16 12a2 2 0 11-4 0 2 2 0 014 0zM16 4a2 2 0 11-4 0 2 2 0 014 0zM16 20a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                            </button>
                                            {showMenu === index && (
                                                <div className="absolute right-12 bg-white rounded-md shadow-lg origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <a href="#edit-tmsh" onClick={openEditModal} className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Edit</a>
                                                        <a href="#delete-tmsh" onClick={openDeleteModal} className="block px-4 py-2 text-sm text-gray-700 " role="menuitem">Delete</a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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
                    <div className="bg-[#ece8e8] p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-black">Add Today Work Details</h2>
                            <a href="#close" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Project</label>
                                <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                    <option value="1">IT Infrastructure</option>
                                    <option value="2">Network Security</option>
                                    <option value="3">Mobile App Development</option>
                                    <option value="4">Data Analysis Platform</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-evenly gap-8 mt-4">
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Deadline</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Total Hours</label>
                                    <input type="text" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Remaining Hours</label>
                                    <input type="text" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-evenly gap-8 mt-4">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Date</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Hours</label>
                                    <input type="text" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Description</label>
                                <textarea name="desc" id="desc" required className="w-full border rounded-lg p-2" />
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
                    <div className="bg-[#ece8e8] p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-black">Edit Department</h2>
                            <a href="#close" onClick={closeEditModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="mb-4 w-1/2">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Project</label>
                                <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                    <option value="1">IT Infrastructure</option>
                                    <option value="2">Network Security</option>
                                    <option value="3">Mobile App Development</option>
                                    <option value="4">Data Analysis Platform</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-evenly gap-8 mt-4">
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Deadline</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Total Hours</label>
                                    <input type="text" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Remaining Hours</label>
                                    <input type="text" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-evenly gap-8 mt-4">
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Date</label>
                                    <input type="date" name="deadline" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Hours</label>
                                    <input type="text" name="deptName" id="deptName" defaultValue={editDept} required className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-slate-700">Description</label>
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
                    <div className="bg-[#ece8e8] p-8 w-1/3 rounded-lg">
                        <div className="">
                            <h2 className="text-2xl font-bold text-black">Delete Department?</h2>
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

export default TimeSheet;

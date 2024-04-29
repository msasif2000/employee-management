import { useEffect, useState } from "react";
import DashHeader from "../../Components/DashHeader/DashHeader";
import DataNumber from "../../Components/DataNumber/DataNumber";

const Overtime = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editDept, setEditDept] = useState('');
    const [overTime, setOverTime] = useState([]);

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
        fetch("/overtime.json")
            .then((res) => res.json())
            .then((data) => {
                setOverTime(data);
            });
    }, []);
    return (
        <div>
            <div className="py-2 flex items-center justify-between">
                <DashHeader title="Overtime" />
                <div>
                    <a href="#dept-modal" onClick={openModal}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">+ Add Overtime</button>
                    </a>
                </div>
            </div>

            <div className="flex items-center justify-evenly gap-8 text-xl mt-4">
                <div className="bg-bs2 p-4 w-full">
                    <h3>Overtime Employee</h3>
                    <p><span className="font-bold">20</span> <span className="text-sm">this month</span></p>
                </div>
                <div className="bg-bs2 p-4 w-full">
                    <h3>Overtime Hours</h3>
                    <p><span className="font-bold">118</span> <span className="text-sm">this month</span></p>
                </div>
                <div className="bg-bs2 p-4 w-full">
                    <h3>Pending Request</h3>
                    <p><span className="font-bold">24</span></p>
                </div>
                <div className="bg-bs2 p-4 w-full">
                    <h3>Rejected</h3>
                    <p><span className="font-bold">5</span></p>
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
                            <tr className="bg-bg1 text-sm font-bold">
                                <th>#</th>
                                <th>NAME</th>
                                <th>OT DATE</th>
                                <th>OT HOURS</th>
                                <th>OT TYPE</th>
                                <th>DESCRIPTION</th>
                                <th>STATUS</th>
                                <th>APPROVED BY</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {/* body */}
                        <tbody>
                            {overTime?.map((tmsh, index) => (
                                <tr key={tmsh.id} className={index % 2 === 0 ? 'bg-ic1' : 'bg-bg1'}>
                                    <td>{tmsh.id}</td>
                                    <td style={{ whiteSpace: 'nowrap' }} className="flex items-center gap-1">
                                        <img src={tmsh?.image} alt="" className="h-12 w-12 rounded-full" />
                                        <span className="text-base font-bold w-full pr-1">{tmsh.name}</span>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }} className="w-full">{tmsh.date}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.othours}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.ottype}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.desc}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.status}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.appBy}</td>
                                    <td>
                                        <div className="relative">
                                            <button className="" onClick={() => handleMenuClick(index, tmsh?.othours)}>
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
                                                        <a href="#edit-tmsh" onClick={openEditModal} className="block px-4 py-2 text-sm text-gray-700 hover:bg-ic1" role="menuitem">Edit</a>
                                                        <a href="#delete-tmsh" onClick={openDeleteModal} className="block px-4 py-2 text-sm text-gray-700 hover:bg-ic1" role="menuitem">Delete</a>
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
                    <div className="bg-ic1 w-1/3 p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Add Overtime</h2>
                            <a href="#close" onClick={closeModal}>
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
            {/* Edit Department Modal */}
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
                                <input type="text" name="deptName" id="deptName" defaultValue={editDept} required className="w-full border rounded-lg p-2" />
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

export default Overtime;
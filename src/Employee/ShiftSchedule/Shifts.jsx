import { useEffect, useState } from "react";
import DashHeader from "../../Components/DashHeader/DashHeader";
import DataNumber from "../../Components/DataNumber/DataNumber";

const Shifts = () => {
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

    console.log(editDept);

    useEffect(() => {
        fetch("/shift.json")
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
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">+ Add Shifts</button>
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
                            <tr className="bg-bg1 text-sm font-bold">
                                <th>#</th>
                                <th>SHIFT NAME</th>
                                <th>MIN START TIME</th>
                                <th>START TIME</th>
                                <th>MAX START TIME</th>
                                <th>MIN END TIME</th>
                                <th>END TIME</th>
                                <th>MAX END TIME</th>
                                <th>BREAK TIME</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {/* body */}
                        <tbody>
                            {timeSheet?.map((tmsh, index) => (
                                <tr key={tmsh.id} className={index % 2 === 0 ? 'bg-ic1' : 'bg-bg1'}>
                                    <td>{tmsh?.id}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <span className="text-base font-bold">{tmsh.name}</span>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.mst}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.st}</td>
                                    <td>{tmsh.mxs}</td>
                                    <td>{tmsh.met}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.et}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.mxe}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{tmsh.bt}</td>
                                    <td>
                                        <select name="active" id="1" className="bg-bs1 rounded">
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>

                                    </td>
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
                    <div className="bg-ic1 p-8 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Add Today Work Details</h2>
                            <a href="#close" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="w-full">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Shift Name</label>
                                <input type="text" name="name" id="deptName" required className="w-full border rounded-lg p-2" />
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
                            <h2 className="text-2xl font-bold text-txt2">Edit Shifts</h2>
                            <a href="#close" onClick={closeEditModal}>
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

            {/* Delete Department Modal */}
            {deleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 w-1/3 rounded-lg">
                        <div className="">
                            <h2 className="text-2xl font-bold text-txt2">Delete Shift?</h2>
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

export default Shifts;
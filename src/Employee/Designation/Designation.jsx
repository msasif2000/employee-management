import { useEffect, useState } from "react";
import DataNumber from "../../Components/DataNumber/DataNumber";
import DashHeader from "../../Components/DashHeader/DashHeader";


const Designation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editDesg, setEditDesg] = useState('');
    const [desgn, setDesgn] = useState([]);
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
        setEditDesg(dept);
    };
    useEffect(() => {
        fetch("/desig.json")
            .then((res) => res.json())
            .then((data) => {
                setDesgn(data);
            });
    }, []);

    return (
        <div>
            <div className="py-2 flex items-center justify-between">
                <DashHeader title="Designations" />
                <div>
                    <a href="#desg-modal" onClick={openModal}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">+ Add Designation</button>
                    </a>
                </div>
            </div>

            {/*data selection*/}
            <DataNumber />



            {/* Departments Table */}
            <div>
                <div className="overflow-y-auto pt-12">
                    <table className="table min-w-full divide-y divide-red-500">
                        {/* head */}
                        <thead>
                            <tr className="bg-bg1 text-sm font-bold">
                                <th>#</th>
                                <th>DEPARTMENT NAME</th>
                                <th>DESIGNATION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        {/* body */}
                        <tbody>
                            {desgn.map((dept, index) => (
                                <tr key={dept.id} className={index % 2 === 0 ? 'bg-ic1' : 'bg-bg1'}>
                                    <th>{dept.id}</th>
                                    <td>{dept.dept}</td>
                                    <td>{dept.dsgn}</td>
                                    <td>
                                        <div className="relative">
                                            <button className="" onClick={() => handleMenuClick(index, dept?.dsgn)}>
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
                                                <div className="absolute left-8 bg-white rounded-md shadow-lg origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        <a href="#edit-dept" onClick={openEditModal} className="block px-4 py-2 text-sm text-gray-700 hover:bg-ic1" role="menuitem">Edit</a>
                                                        <a href="#delete-dept" onClick={openDeleteModal} className="block px-4 py-2 text-sm text-gray-700 hover:bg-ic1" role="menuitem">Delete</a>
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

            {/* Add Designation Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-ic1 p-8 w-1/3 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-txt2">Add Designation</h2>
                            <a href="#close" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Designation Name</label>
                                <input type="text" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Select Department</label>
                                <select name="deptName" id="deptName" required className="w-full border rounded-lg p-2">
                                    <option value="">Select Department</option>
                                    <option value="1">IT Management</option>
                                    <option value="2">Application Development</option>
                                    <option value="3">Web Development</option>
                                    <option value="4">Software Development</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Add Designation</button>
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
                            <h2 className="text-2xl font-bold text-txt2">Edit Designation</h2>
                            <a href="#close" onClick={closeEditModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </a>
                        </div>
                        <form className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Designation Name</label>
                                <input type="text" name="deptName" id="deptName" defaultValue={editDesg} className="w-full border rounded-lg p-2" />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Update</button>
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
                            <h2 className="text-2xl font-bold text-txt2">Delete Designation?</h2>
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

export default Designation;
import { useState } from "react";
import DashHeader from "../../Components/DashHeader/DashHeader";

const Departments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <div className="py-2 flex items-center justify-between">
                <DashHeader title="Departments" />
                <div>
                    <a href="#dept-modal" onClick={openModal}>
                        <button className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">+ Add Department</button>
                    </a>
                </div>
            </div>

            {
                isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-ic1 p-8 w-1/3 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-txt2">Add Department</h2>
                                <a href="#close" onClick={closeModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </a>
                            </div>
                            <form className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="deptName" className="block text-sm font-semibold text-txt1">Department Name</label>
                                    <input type="text" name="deptName" id="deptName" required className="w-full border rounded-lg p-2" />
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="bg-sl1 hover:bg-sl2 text-white font-bold py-2 px-4 rounded-lg">Add Department</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Departments;

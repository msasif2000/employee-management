import { useState } from "react";

const DataNumber = () => {
    const [dataPerPage, setDataPerPage] = useState(10);

    const handleDataChange = (e) => {
        setDataPerPage(e.target.value);
    };
    return (
        <div>
            <div className="flex pt-8 items-center gap-2">
                Show
                <select
                    id="dataPerPage"
                    value={dataPerPage}
                    onChange={handleDataChange}
                    className="px-2 py-1 border rounded-md"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
                entries
            </div>
        </div>
    );
};

export default DataNumber;
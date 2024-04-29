import { Link } from "react-router-dom";


const DashHeader = ({ title}) => {
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex gap-1 font-semibold">
                    <Link to="/dashboard/departments">Dashboard</Link>/<span>{title}</span>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;
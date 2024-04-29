import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashBoard from './Layout/DashBoard.jsx';
import Departments from "./Employee/Departments/Departments"
import Designation from './Employee/Designation/Designation.jsx';
import TimeSheet from './Employee/TimeSheet/TimeSheet.jsx';
import ShiftSchedule from './Employee/ShiftSchedule/ShiftSchedule.jsx';
import Overtime from './Employee/Overtime/Overtime.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "/dashboard/departments",
        element: <Departments />,
      }, 
      {
        path: "/dashboard/designations",
        element: <Designation />,
      },
      {
        path: "/dashboard/timeSheet",
        element: <TimeSheet />,
      },
      {
        path: "/dashboard/shiftSchedule",
        element: <ShiftSchedule />,
      },
      {
        path: "/dashboard/overtime",
        element: <Overtime />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

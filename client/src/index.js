import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import MissingEmployeeList from "./Pages/MissingEmployees";
import EmployeesSearch from "./Pages/EmployeesSearch";
import EmployeeListForYears from "./Pages/EmployeeListForYears";

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/employees/years-of-experience/:year",
        element: <EmployeeListForYears />,
      },
      {
        path: "/:collum/:order",
        element: <EmployeeList />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/missing",
        element: <MissingEmployeeList />,
      },
      {
        path: "/employees/:search",
        element: <EmployeesSearch />,
      },
      {
        path: "/create/employee",
        element: <EmployeeCreator />,
      },
      {
        path: "/create/equipment",
        element: <EquipmentCreator />,
      },
      {
        path: "/update/employee/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/update/equipment/:id",
        element: <EquipmentUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

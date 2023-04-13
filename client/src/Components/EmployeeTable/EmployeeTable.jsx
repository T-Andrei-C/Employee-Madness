import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ sort, employees, onDelete, present }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th className="table-name" onClick={sort}>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
          <th>
            <Link to="/missing">
              <button
                disabled={window.location.href === "http://localhost:3000/missing" ? true : false}
                type="button">Missing Employees</button>
            </Link>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td> <input onClick={() => present(employee)} type="checkbox" id={employee._id} defaultChecked={employee.present} /></td>
            <td>
              <Link to={`/update/employee/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;

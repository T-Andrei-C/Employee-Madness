import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ sortForSingleKey, sortForObjects, employees, onDelete, present }) => {

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr className="table-click" >
            <th onClick={() => sortForSingleKey("name")}>Name</th>
            <th onClick={() => sortForSingleKey("level")} >Level</th>
            <th onClick={() => sortForSingleKey("position")}>Position</th>
            <th onClick={() => sortForObjects("equipment")}>Equipment</th>
            <th onClick={() => sortForObjects("favoriteBrand")}>Brand</th>
            <th onClick={() => sortForObjects("favColor")}>Color</th>
            <th>Present</th>
            <th>Years of Experience</th>
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
          {employees?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{employee.equipment.name}</td>
              <td>{employee.favoriteBrand.name}</td>
              <td>{employee.favColor.name}</td>
              <td> <input onClick={() => present(employee)} type="checkbox" id={employee._id} defaultChecked={employee.present} /></td>
              <td>{employee.years}</td>
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
  )
};

export default EmployeeTable;

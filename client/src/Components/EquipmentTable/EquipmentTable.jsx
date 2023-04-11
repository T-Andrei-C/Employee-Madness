import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({ equipment, onDelete }) => (
  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Equipment</th>
          <th>Amount</th>
          <th>Type</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipment.map((equipt) => (
          <tr key={equipt._id}>
            <td>{equipt.name}</td>
            <td>{equipt.amount}</td>
            <td>{equipt.type}</td>
            <td>
              <Link to={`/update/equipment/${equipt._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(equipt._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;

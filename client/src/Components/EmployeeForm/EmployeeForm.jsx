import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    
    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    
    return onSave(employee, equipments, brands);
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      {employee && equipments ? 
      <div className="control">
        <label htmlFor="equipments">Equipment:</label>
        <select name="equipment" id="equipments">
          <option>{employee && equipments?.find(equipment => equipment._id === employee.equipment)?.name}</option>

          {employee && equipments?.filter(e => e._id !== employee.equipment).map(equipment => (
            <option value={equipment.name} key={equipment._id}>{equipment.name}</option>
          ))}
        </select>
      </div> : 
      <div className="control">
        <label htmlFor="equipments">Equipment:</label>
        <select name="equipment" id="equipments">
          <option hidden>Select an equipment...</option>
          
          {equipments?.map(equipment => (
            <option value={equipment.name} key={equipment._id}>{equipment.name}</option>
          ))}
        </select>
      </div>}

      {employee && brands ? 
      <div className="control">
        <label htmlFor="brands">Brand:</label>
        <select name="favoriteBrand" id="brands">
          <option>{employee && brands?.find(brand => brand._id === employee.favoriteBrand)?.name}</option>

          {employee && brands?.filter(b => b._id !== employee.favoriteBrand).map(brand => (
            <option value={brand.name} key={brand._id}>{brand.name}</option>
          ))}
        </select>
      </div> : 
      <div className="control">
        <label htmlFor="brands">Brand:</label>
        <select name="favoriteBrand" id="brands">
          <option hidden>Select a brand...</option>
          
          {brands?.map(brand => (
            <option value={brand.name} key={brand._id}>{brand.name}</option>
          ))}
        </select>
      </div>}

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee, equipments) => {
  employee.equipment = equipments.find(e => e.name === employee.equipment)._id;
  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch(`/api/equipment/`).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEquipments()
    .then((equipment) => {
      setEquipments(equipment);
      // setEmployeeLoading(false);
    });
  }, []);

  const handleCreateEmployee = (employee, equipments) => {
    setLoading(true);
    createEmployee(employee, equipments)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipments={equipments}
    />
  );
};

export default EmployeeCreator;

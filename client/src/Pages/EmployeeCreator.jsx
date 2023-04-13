import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";

const createEmployee = (employee, equipments, brands) => {
  employee.equipment = equipments.find(e => e.name === employee.equipment)._id;
  employee.favoriteBrand = brands.find(b => b.name === employee.favoriteBrand)._id;
  console.log(brands)
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

const fetchBrands = () => {
  return fetch(`/api/brands/`).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [equipments, setEquipments] = useState(null)
  const [brands, setBrands] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEquipments()
    .then((equipment) => {
      setEquipments(equipment);
      // setEmployeeLoading(false);
    });
    fetchBrands()
    .then((brand) => {
      setBrands(brand);
      // setEmployeeLoading(false);
    });
  }, []);

  const handleCreateEmployee = (employee, equipments, brands) => {
    setLoading(true);
    createEmployee(employee, equipments, brands)
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
      brands={brands}
    />
  );
};

export default EmployeeCreator;

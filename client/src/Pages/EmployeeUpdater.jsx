import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee, equipments, brands) => {
  console.log(employee)
  employee.equipment = equipments.find(e => e.name === employee.equipment)._id;
  employee.favoriteBrand = brands.find(b => b.name === employee.favoriteBrand)._id;
  
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipments = () => {
  return fetch(`/api/equipment/`).then((res) => res.json());
};

const fetchBrands = () => {
  return fetch(`/api/brands/`).then((res) => res.json());
};


const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [equipments, setEquipments] = useState(null)
  const [brands, setBrands] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
      });
    fetchEquipments()
    .then((equipment) => {
      setEquipments(equipment);
    });
    fetchBrands()
    .then((brand) => {
      setBrands(brand);
      setEmployeeLoading(false);
    });
  }, [id]);

  const handleUpdateEmployee = (employee, equipments, brands) => {
    setUpdateLoading(true);
    updateEmployee(employee, equipments, brands)
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      equipments={equipments}
      brands={brands}
    />
  );
};

export default EmployeeUpdater;

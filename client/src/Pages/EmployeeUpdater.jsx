import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchColors = (id) => {
  return fetch(`/api/colors/`).then((res) => res.json());
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
  const [colors, setColors] = useState(null)
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
    });
    fetchColors()
    .then((color) => {
      setColors(color);
      setEmployeeLoading(false);
    });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee)
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
      equipments={equipments}
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
      brands={brands}
      colors={colors}
    />
  );
};

export default EmployeeUpdater;

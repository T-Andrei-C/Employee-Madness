import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import InputFields from "../Components/InputFields/InputFields";
import SortSelector from "../Components/SortSelector/SortSelector";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const MissingEmployeeList = () => {
  let [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyEmployees, setCopyEmployees] = useState(null)
  const [render, setRender] = useState(0);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handlePatchPresent = (employee) => {
    employee.present = !employee.present;
    fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json());
    setRender(render + 1);
  }

  const handleInput = (e) => {
    employees = copyEmployees;
    setEmployees(employees.filter(employee => 
      employee.level.toLowerCase().includes(e.target.value.toLowerCase()) || 
      employee.position.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  }

  const handleSort = (e) => {
    const value = e.target.value;
    const newEmployees = [...employees];
    newEmployees.map(employee => employee.name = employee.name.split(" "));
    value === "Middle Name" ? newEmployees.sort((a,b) => a.name[1].localeCompare(b.name[1])) : 
    value === "First Name" ? newEmployees.sort((a,b) => a.name[0].localeCompare(b.name[0])) : 
    value === "Last Name" ? newEmployees.sort((a,b) => a.name[a.name.length - 1].localeCompare(b.name[b.name.length - 1])) : 
    value === "Position" ? newEmployees.sort((a,b) => a.position.localeCompare(b.position)) : 
    newEmployees.sort((a,b) => a.level.localeCompare(b.level));
 
    newEmployees.map(employee => employee.name = employee.name.join(" "))
    setEmployees(newEmployees);
    setCopyEmployees(newEmployees);
  }

  useEffect(() => {
    setLoading(true)
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees.filter(employee => employee.present === false));
        setCopyEmployees(employees.filter(employee => employee.present === false));
      })
  }, [render]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <InputFields handleInput={handleInput}/>
        <SortSelector handleSort={handleSort}/>
      </div>
      <EmployeeTable employees={employees} onDelete={handleDelete} present={handlePatchPresent} />
    </>
  );
};

export default MissingEmployeeList;

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

const EmployeeList = () => {
  let [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyEmployees, setCopyEmployees] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [whichSort, setWhichSort] = useState(false)
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
    // setRender(render + 1);
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

  const handleAscendOrDescend = () => {
    if (whichSort){
      const sort = employees.sort((a,b) => b.name.localeCompare(a.name))
      setEmployees(sort);
      setCopyEmployees(sort);
      setWhichSort(false);
    } else {
      const sort = employees.sort((a,b) => a.name.localeCompare(b.name))
      setEmployees(sort);
      setCopyEmployees(sort);
      setWhichSort(true);
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setCopyEmployees(employees);
      })
  }, [render]);

  if (loading) {
    return <Loading />;
  }

  const numberOfLastEmployee = currentPage * itemsPerPage;
  const numberOfFirstEmployee = numberOfLastEmployee - itemsPerPage;
  const lastNumberOfPage = Math.ceil(employees.length / itemsPerPage);
  const employeesPerPage = employees.slice(numberOfFirstEmployee, numberOfLastEmployee);

  return (
    <>
      <div>
        <InputFields handleInput={handleInput}/>
        <SortSelector handleSort={handleSort}/>
      </div>
      <EmployeeTable sort={handleAscendOrDescend} employees={employeesPerPage} onDelete={handleDelete} present={handlePatchPresent} />
      <button disabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      <button disabled={currentPage === lastNumberOfPage ? true : false} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </>
  );
};

export default EmployeeList;
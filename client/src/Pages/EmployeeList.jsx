import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import InputFields from "../Components/InputFields/InputFields";
import SortSelector from "../Components/SortSelector/SortSelector";
import { useNavigate, useParams } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const navigate = useNavigate();
  let { collum, order } = useParams();
  let [employees, setEmployees] = useState(null);
  const [checkIfAscOrDesc, setCheckIfAscOrDesc] = useState(null);
  const [copyEmployees, setCopyEmployees] = useState(null)
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  let [whichSort, setWhichSort] = useState(false)

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
    value === "Middle Name" ? newEmployees.sort((a, b) => a.name[1].localeCompare(b.name[1])) :
      value === "First Name" ? newEmployees.sort((a, b) => a.name[0].localeCompare(b.name[0])) :
        value === "Last Name" ? newEmployees.sort((a, b) => a.name[a.name.length - 1].localeCompare(b.name[b.name.length - 1])) :
          value === "Position" ? newEmployees.sort((a, b) => a.position.localeCompare(b.position)) :
            newEmployees.sort((a, b) => a.level.localeCompare(b.level));

    newEmployees.map(employee => employee.name = employee.name.join(" "))
    setEmployees(newEmployees);
    setCopyEmployees(newEmployees);
  }

  const handleSortForSingleKey = (param) => {
    setCheckIfAscOrDesc(param);
    if (checkIfAscOrDesc !== param) {
      whichSort = false;
    }

    if (whichSort) {
      const sortEmployees = [...employees];
      navigate(`/${param}/desc`);
      setEmployees(sortEmployees.sort((a, b) => b[param].localeCompare(a[param])));
      setCopyEmployees(sortEmployees.sort((a, b) => b[param].localeCompare(a[param])));
      setWhichSort(false);
    } else {
      const sortEmployees = [...employees];
      navigate(`/${param}/asc`);
      setEmployees(sortEmployees.sort((a, b) => a[param].localeCompare(b[param])));
      setCopyEmployees(sortEmployees.sort((a, b) => a[param].localeCompare(b[param])));
      setWhichSort(true);
    }
  }

  const handleSortForObjects = (param) => {
    setCheckIfAscOrDesc(param);
    if (checkIfAscOrDesc !== param) {
      whichSort = false;
    }
    if (whichSort) {
      const sortEmployees = [...employees];
      setEmployees(sortEmployees.sort((a, b) => b[param].name.localeCompare(a[param.name])));
      setCopyEmployees(sortEmployees.sort((a, b) => b[param].name.localeCompare(a[param].name)));
      navigate(`/${param}/desc`);
      setWhichSort(false);
    } else {
      const sortEmployees = [...employees];
      setEmployees(sortEmployees.sort((a, b) => a[param].name.localeCompare(b[param].name)));
      setCopyEmployees(sortEmployees.sort((a, b) => a[param].name.localeCompare(b[param].name)));
      navigate(`/${param}/asc`);
      setWhichSort(true);
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchEmployees()
      .then((employees) => {
        setLoading(false);

        if (collum === "equipment" || collum === "favColor" || collum === "favoriteBrand") {
          if (order === "desc") {
            const sortEmployees = [...employees];
            setEmployees(sortEmployees.sort((a, b) => b[collum].name.localeCompare(a[collum].name)));
            setCopyEmployees(sortEmployees.sort((a, b) => b[collum].name.localeCompare(a[collum].name)));
            navigate(`/${collum}/desc`);
            setWhichSort(false);
          } else if (order === "asc") {
            const sortEmployees = [...employees];
            setEmployees(sortEmployees.sort((a, b) => a[collum].name.localeCompare(b[collum].name)));
            setCopyEmployees(sortEmployees.sort((a, b) => a[collum].name.localeCompare(b[collum].name)));
            navigate(`/${collum}/asc`);
            setWhichSort(true);
          }
        } else {
          if (order === "desc") {
            const sortEmployees = [...employees];
            setEmployees(sortEmployees.sort((a, b) => b[collum].localeCompare(a[collum])));
            setCopyEmployees(sortEmployees.sort((a, b) => b[collum].localeCompare(a[collum])));
            navigate(`/${collum}/desc`);
            setWhichSort(false);
          } else if (order === "asc") {
            const sortEmployees = [...employees];
            setEmployees(sortEmployees.sort((a, b) => a[collum].localeCompare(b[collum])));
            setCopyEmployees(sortEmployees.sort((a, b) => a[collum].localeCompare(b[collum])));
            navigate(`/${collum}/asc`);
            setWhichSort(true);
          }
        }

        if (order === undefined) {
          setEmployees(employees);
          setCopyEmployees(employees);
        }
      })

  }, [collum]);

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
        <InputFields handleInput={handleInput} />
        <SortSelector handleSort={handleSort} />
      </div>
      <EmployeeTable
        sortForSingleKey={handleSortForSingleKey}
        sortForObjects={handleSortForObjects}
        employees={employeesPerPage}
        onDelete={handleDelete}
        present={handlePatchPresent} />
      <div className="next-previous-btns">
        <button disabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <button disabled={currentPage === lastNumberOfPage ? true : false} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </>
  );
};

export default EmployeeList;
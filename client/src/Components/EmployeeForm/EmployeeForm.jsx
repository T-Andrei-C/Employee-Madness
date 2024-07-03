import { useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipments, brands, colors }) => {

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const newEmployee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    if (newEmployee.bookName !== "" && newEmployee.author !== "" && employee){
      if (!employee.books.some(b => b.bookName === newEmployee.bookName && b.author === newEmployee.author)){
        const newBooks = [...employee.books, {"bookName": newEmployee.bookName, "author": newEmployee.author}]
        newEmployee.books = newBooks;
      } 
    } else {
      newEmployee.books = {"bookName": newEmployee.bookName, "author": newEmployee.author};
    }

    if (newEmployee.level === "Junior"){
      newEmployee.years = 0;
    }

    return onSave(newEmployee);
  };

  const [newLevel, setNewLevel] = useState("");
  const [rerender, setRerender] = useState(false);
  const [notJunior, setNotJunior] = useState(employee?.level);
  const updateSalary = (e) => {
    const value = e.target.value;
   if (e.target.value < 0){
    e.target.value = 0;
   }
    const level = value === 0 && value <= 100 ? "Junior" : value >= 101 && value <= 300 ? "Medior" :
    value >= 301 && value <= 400 ? "Senior" : value >= 401 && value <= 800 ? 'Expert' : value > 800 ? "Godlike" : "Junior"

    employee ? employee.level = level : setNewLevel(level);
    setRerender(!rerender)
  }

  const handleInputForLevel = (e) => {
    if (e.target.value === "Junior"){
      setNotJunior("Junior")
    } else {
      setNotJunior("Not Junior")
    }
  }

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
          defaultValue={employee ? employee.level : newLevel}
          name="level"
          id="level"
          onInput={handleInputForLevel}
        />
      </div>

      <div className="control">
        <label htmlFor="salary">Salary:</label>
        <input
          defaultValue={employee ? employee.salary : null}
          type="number"
          name="salary"
          id="salary"
          onInput={updateSalary}
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

      <div  className="control">
        <label htmlFor="years">Years of Experience:</label>
        <input
          hidden={notJunior === "Junior" ? true : false}
          defaultValue={employee?.years}
          name="years"
          id="years"
        />
      </div>

      <div className="control">
        <label  htmlFor="bookName">Book Name:</label>
        <input
          placeholder="Pick a book name..."
          name="bookName"
          id="bookName"
        />
         <label htmlFor="author">Author:</label>
        <input
          placeholder="Pick an author..."
          name="author"
          id="author"
        />
      </div>

      <div className="control">
        <label htmlFor="books">Books:</label>
        {employee?.books.map(book => (
          <p key={book.bookName + book.author}>{book.bookName} by {book.author}</p>
        ))}
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <select name="equipment" id="equipment">
          <option value="" selected={true} hidden="disabled">
            Select an Equipment...
          </option>
          {equipments?.map((equip) => (
            <option
              selected={employee?.equipment._id === equip._id}
              key={equip._id}
              value={equip._id}
            >
              {equip.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="favoriteBrand">Favorite Brand:</label>
        <select name="favoriteBrand" id="favoriteBrand">
          <option value="" selected={true} hidden="disabled">
            Select a Brand...
          </option>
          {brands?.map((br) => (
            <option
              selected={employee?.favoriteBrand._id === br._id}
              key={br._id}
              value={br._id}
            >
              {br.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control">
        <label htmlFor="favColor">Favorite Color:</label>
        <select name="favColor" id="favColor">
          <option value="" selected={true} hidden="disabled">
            Select a color...
          </option>
          {colors?.map((col) => (
            <option
              selected={employee?.favColor._id === col._id}
              key={col._id}
              value={col._id}
            >
              {col.name}
            </option>
          ))}
        </select>
      </div>
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

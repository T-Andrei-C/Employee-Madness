import "./InputFields.css";
const InputFields = ({handleInput}) => {
  
    return (
        <div className="input">
            <input onInput={handleInput} placeholder="Search Employee..."></input>
        </div>
    );
  };
  
  export default InputFields;
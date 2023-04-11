import "./SortSelector.css"

const SortSelector = ({handleSort}) => {
  
    return (
        <div className="selector">
            <select defaultValue="Sort by" onChange={handleSort}>
                <option value="Sort by" hidden>Sort by...</option>
                <option>First Name</option>
                <option>Last Name</option>
                <option>Middle Name</option>
                <option>Position</option>
                <option>Level</option>
            </select>
        </div>
    );
  };
  
  export default SortSelector;
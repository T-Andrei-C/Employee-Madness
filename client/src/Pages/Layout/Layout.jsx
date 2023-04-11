import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="employee">
          <Link to="/">Employees</Link>
        </li>
        <li className="equipment">
          <Link to="/equipment">Equipment</Link>
        </li>
        <li>
          <Link to="/create/equipment">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
        <li>
          <Link to="/create/employee">
            <button type="button">Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;

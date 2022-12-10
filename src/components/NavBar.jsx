import { Link, NavLink } from "react-router-dom";
import { BsSearch, BsHouseFill } from "react-icons/bs";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>

      <form id="search-form">
        <BsSearch />
        <input type="text" />
      </form>

      <ul id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/register">Registrar</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

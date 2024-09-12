import { NavLink, useNavigate } from "react-router-dom";
//css
import styles from "./navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className={`${styles.container} d-flex-r`}>
      <h3 className={`${styles.heading}`} onClick={() => navigate("/home")}>
        Ship Now
      </h3>
      <ul className={`${styles.menuContainer} d-flex-r`}>
        <NavLink  to="/home" className={styles.home}>
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>HOME</span>
          )}
        </NavLink>
        <NavLink to="/signup">
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>SIGNUP</span>
          )}
        </NavLink>
        <NavLink to="/login">
          {({ isActive }) => (
            <span className={isActive ? styles.active : ""}>LOGIN</span>
          )}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

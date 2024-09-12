import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
//react-icons
import { TfiMenuAlt } from "react-icons/tfi";
import { LuFolder } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
//CSS
import styles from "./userDashboard.module.scss";

const UserDashboard = () => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setSpinner(true);
    navigate("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>ShipNow</h1>
        <ul>
          <NavLink to="/user/quote">
            {({ isActive }) => (
              <span className={isActive ? styles.active : ""}>
                <TfiMenuAlt className={styles.icon} /> Quotes
              </span>
            )}
          </NavLink>
          <NavLink to="/user/saved-quotes">
            {({ isActive }) => (
              <span className={isActive ? styles.active : ""}>
                <LuFolder className={styles.icon} />
                Saved Quotes
              </span>
            )}
          </NavLink>
          <NavLink to="/user/shipment">
            {({ isActive }) => (
              <span className={isActive ? styles.active : ""}>
                <MdOutlineLocalShipping className={styles.icon} /> Shipment
              </span>
            )}
          </NavLink>
          <NavLink to="/user/setting">
            {({ isActive }) => (
              <span className={isActive ? styles.active : ""}>
                <FiSettings className={styles.icon} /> Setting
              </span>
            )}
          </NavLink>
        </ul>
      </div>
      <Button className={styles.logout} onClick={handleLogout}>
        <RiLogoutCircleLine /> Logout
      </Button>
    </div>
  );
};

export default UserDashboard;

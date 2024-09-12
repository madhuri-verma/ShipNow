import { NavLink, Outlet } from "react-router-dom";
//css
import styles from "./quote.module.scss";

const Quote = () =>  (
    <div className={styles.container}>
      <div className={styles.content}>
        <ul className={styles.menuContainer}>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/quote/letter"}
          >
            Letter
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            to={"/user/quote/package"}
          >
            Package
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  );


export default Quote;

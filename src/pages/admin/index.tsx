import { NavLink, Outlet, useNavigate } from "react-router-dom";
//components
import AdminDashboard from "../../components/adminDashboard";
//css
import styles from "./admin.module.scss";

const Admin = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <AdminDashboard />
      <div className={styles.content}>
        <div className={styles.header}>
          <pre>
            You're Logged In as Admin.
            <a onClick={()=>{
              sessionStorage.removeItem('token')
              navigate('/login')
            }}> Login As User</a>
          </pre>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;

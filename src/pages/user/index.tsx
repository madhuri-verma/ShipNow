import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { USER_URL } from "../../apiHelper";
import axios from "axios";
//components
import UserDashboard from "../../components/userDashboard";
import ToastView from "../../components/Toast";
//css
import styles from "./user.module.scss";

const User = () => {
  const token = sessionStorage.getItem("token");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
  });

  const fetchData = async () => {
    try {
      await axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSuccess(true);
          setUserName({
            firstName: res.data.result.firstName,
            lastName: res.data.result.lastName,
          });
        })
        .catch((err) => {
          setSuccess(false);
          setToast(true);
          setMessage("Something is Wrong!");
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };
  useEffect(() => {
    if (userName.firstName == "" && userName.lastName == "") {
      fetchData();
    }
  }, []);
  return (
    <div className={styles.container}>
      <UserDashboard />
      <div className={styles.content}>
        <div className={styles.header}>
          <pre>
            You're Logged In as
            <span
              className={styles.userName}
            >{`${userName.firstName} ${userName.lastName}`}</span>
            .<NavLink to={"/login"}>Return To Your account</NavLink>
          </pre>
        </div>
        <Outlet />
      </div>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default User;

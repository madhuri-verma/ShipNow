import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//CSS
import styles from "../../../user/accountSetting/setting.module.scss";
//common
import Button from "../../../../common/button";
//apiHelper
import {
  ADMIN_SINGLE_USER_URL,
  ADMIN_USER_UPDATE_URL,
} from "../../../../apiHelper";
//components
import ToastView from "../../../../components/Toast";

const UpdateUser: React.FC = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const { id } = useParams();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    number: "",
    companyName: "",
  });

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios
        .get(`${ADMIN_SINGLE_USER_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res)
          setInput({ ...res.data.result[0] });
        })
        .catch((err) => {
          setToast(true);
          setSuccess(false);
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is WRONG!!");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${ADMIN_USER_UPDATE_URL}${id}`,
          {
            ...input,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res)
          navigate("/admin/all-users", {
            state: {
              response: res.data.result.successful,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `} onSubmit={handleSubmit}>
        <div className={`${styles.info}`}>
          <h4>Update User</h4>
          <div className={`${styles.personalInfo}`}>
            <div className={`${styles.formContent}`}>
              <label>First Name </label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                value={input.firstName}
              />
            </div>

            <div className={`${styles.formContent}`}>
              <label>Last Name </label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                value={input.lastName}
              />
            </div>

            <div className={`${styles.formContent} `}>
              <label className="">Company Name </label>
              <input
                className=""
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                value={input.companyName}
              />
            </div>

            <div className={`${styles.formContent}`}>
              <label>Phone Number</label>
              <input
                name="number"
                type="tel"
                placeholder="Phone Number"
                onChange={handleChange}
                value={input.number}
              />
            </div>
            <div className={`${styles.submit}`}>
              <Button className={`${styles.btn}`} value="save changes" />
            </div>
          </div>

          {toast ? (
            <ToastView
              message={message}
              success={success}
              setToast={setToast}
            />
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};
export default UpdateUser;

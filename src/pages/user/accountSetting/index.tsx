import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//react-icons
import { FaEdit } from "react-icons/fa";
//CSS
import styles from "./setting.module.scss";
//common
import Button from "../../../common/button";
//components
import ToastView from "../../../components/Toast";
//apiHelper
import {
  USER_PROFILE_URL,
  USER_UPDATE_URL,
  USER_URL,
} from "../../../apiHelper";

const Setting: React.FC = () => {
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [input, setInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    number: "",
    companyName: "",
  });

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async () => {
    try {
      await axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInput({ ...res.data.result});
        })
        .catch((err) => {
          setToast(true);
          setSuccess(false);
          setMessage(err.data.response.error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage("Something is wrong!");
    }
  };
  useEffect(() => {
    if (location.state) {
      const { response } = location.state;
      setSuccess(true);
      setToast(true);
      setMessage(response);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      axios
        .put(
          USER_UPDATE_URL,
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
          setSuccess(true);
          setToast(true);
          setMessage(res.data.result.message);
        })
        .catch((error) => {
          setSuccess(false);
          setToast(true);
          setMessage(error);
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is wrong!!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const changePassword = () => {
    navigate("/user/setting/change-password");
  };
  const handleDelete = () => {
    navigate("/user/setting/delete-verification");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  };
  const handleUpload = () => {
    setLoader(true);
    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    axios
      .post(USER_PROFILE_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLoader(false);
        setToast(true);
        setSuccess(true);
        setMessage(res.data.result.uploaded);
      })
      .catch((error) => {
        setLoader(false);
        setToast(true);
        setSuccess(false);
        setMessage(error.response.data.message);
      });
  };
  return (
    <div className={`${styles.container}`}>
      <form className={`${styles.content} d-flex-r `} onSubmit={handleSubmit}>
        <div className={`${styles.info}`}>
          <h5>Account Setting</h5>
          <div className={`${styles.detail}`}>
            <div className={`${styles.formContent}`}>
              <label>E-mail Address</label>
              <input
                name="email"
                readOnly
                type="email"
                placeholder="Email Address"
                onChange={handleChange}
                value={input.email}
              />
            </div>

            <div className={`${styles.password} d-flex-col`}>
              <label>Password </label>
              <button className="btn btn-dark" onClick={changePassword}>
                Change Your Password
              </button>
            </div>
          </div>
          <h5 className="mt-5">Personal Info</h5>
          <div className={`${styles.personalInfo}`}>
            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent}`}>
                <label>
                  First Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="input"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={input.firstName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>
                  Last Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>{" "}
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="input"
                  onChange={handleChange}
                  value={input.lastName}
                />
              </div>
            </div>

            <div className={`${styles.input} d-flex-r`}>
              <div className={`${styles.formContent} `}>
                <label className="">
                  Company Name
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  className="input"
                  placeholder="Company Name"
                  onChange={handleChange}
                  value={input.companyName}
                />
              </div>

              <div className={`${styles.formContent}`}>
                <label>
                  Phone Number{" "}
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </label>
                <input
                  name="number"
                  type="number"
                  className="input"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={input.number}
                />
              </div>
            </div>
          </div>

          <div className={`${styles.submit}`}>
            <Button className={`${styles.btn}`} value="save changes" />
          </div>
        </div>
        <div className={`${styles.profile} mt-5`}>
          <label htmlFor="inputTag">
            Choose Image
            <input
              id="inputTag"
              type="file"
              onChange={handleImageChange}
            />{" "}
            <FaEdit />
          </label>

          <button
            disabled={loader?true:false}
            type="button"
            className="btn btn-primary"
            onClick={handleUpload}
          >
            {loader ? "Processing.." : "Upload Image"}
          </button>
          <div className={`${styles.delete}`}>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Delete Your Account
            </button>
            <p>
              Deleting Your Account will Loss all your data. Check Your data
              before deleting Your account.
            </p>
          </div>
        </div>
      </form>

      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};
export default Setting;

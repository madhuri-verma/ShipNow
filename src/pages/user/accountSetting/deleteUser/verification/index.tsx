import { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import axios from "axios";
//models
import { UserState } from "../../../../../models/UserState";
//apiHelper
import { USER_DELETE_VERIFY_URL } from "../../../../../apiHelper";
//CSS
import styles from "../../../../login/forgetPassword/forgetPassword.module.scss";
//validations
import { loginValidationSchema } from "../../../../../utils/Validation";
//common
import Button from "../../../../../common/button";
//components
import ToastView from "../../../../../components/Toast";
import { useNavigate } from "react-router-dom";

const VerifyDeletingUser = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const token = sessionStorage.getItem("token");
  const handleSubmit = (values: UserState) => {
    try {
      axios
        .post(
          USER_DELETE_VERIFY_URL,
          {
            ...values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setToast(true);
          setSuccess(true);
          setMessage(res.data.result.email);
        })
        .catch((error) => {
          setToast(true);
          setSuccess(false);
          setMessage(error.response.data.error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setMessage('Something is Wrong!');
    }
  };
  return (
    <div className={`${styles.container}`}>
      <Formik<UserState>
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">Delete Account</h4>
            <p className={` ${styles.para} m-2`}>
              Enter Your details and make sure you want to delete your account
            </p>

            <div className={`${styles.formContent}`}>
              <label>
                Email
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field name="email" type="email" placeholder="Enter email" />
              <ErrorMessage
                name="email"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.formContent}`}>
              <label>
                Password
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.submit}`}>
              <Button className={`${styles.forgotBtn}`} value={"Continue"} />
            </div>
          </form>
        )}
      </Formik>
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};
export default VerifyDeletingUser;

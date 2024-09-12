import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
//CSS
import styles from "./login.module.scss";
//models
import { UserState } from "../../models/UserState";
//common
import Button from "../../common/button";
//layouts
import Layout from "../../layout/NavLayout";
import { Particle } from "../../layout/particles";
//validations
import { loginValidationSchema } from "../../utils/Validation";
//apiHelper
import { LOGIN_BASE_URL } from "../../apiHelper";
//components
import ToastView from "../../components/Toast";

const Login: React.FC = () => {
  const token = sessionStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    if (location.state) {
      const { response } = location.state;
      setSuccess(true);
      setToast(true);
      setMessage(response);
    }
    if (token) {
      navigate("/user/quote/letter");
    }
  }, []);

  const handleSubmit = async (values: UserState) => {
    if (toast) {
      setToast(false);
    }
    try {
      setLoader(true);
      await axios
        .post(LOGIN_BASE_URL, values)
        .then((response) => {
          setLoader(false);
          setToast(true);
          setSuccess(true);
          sessionStorage.setItem("token", response.data.result.token);
          sessionStorage.setItem("role", response.data.result.role);
          if (response.data.result.role === "admin") {
            navigate("/admin/saved-quotes");
          } else {
            navigate("/user/quote/letter");
          }
        })
        .catch((err) => {
          setLoader(false);
          setToast(true);
          console.log(err)
          setSuccess(false);
          setMessage(err.response.data.message);
        });
    } catch (error) {
      setToast(true);
      setLoader(false);
      setSuccess(false);
      setMessage("something is wrong!");
    }
  };
  const forgetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <Layout>
      <Particle>
        <div className={`${styles.container}  `}>
          <Formik<UserState>
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form
                className={` ${styles.form} `}
                onSubmit={formik.handleSubmit}
              >
                <>
                  <h1 className="m-1">Login</h1>
                  <div className={`${styles.formContent}`}>
                    <label htmlFor="email">
                      E-mail
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>

                  <div className={`${styles.formContent}`}>
                    <label htmlFor="password">
                      Password
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={`${styles.error} error`}
                    />
                    <a type="button" onClick={forgetPassword}>
                      Forget Password ?
                    </a>
                  </div>
                  <div className={`${styles.submit}`}>
                    <Button
                      disable = {loader}
                      value={loader ? "Processing..." : "Login"}
                      className="login-btn"
                    />
                    <span>
                      Don't Have an account ?
                      <NavLink to={"/signup"}>Sign Up</NavLink>
                    </span>
                  </div>
                </>
              </Form>
            )}
          </Formik>
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
      </Particle>
    </Layout>
  );
};
export default Login;

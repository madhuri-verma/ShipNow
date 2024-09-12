import { useState } from "react";
import axios from "axios";
//CSS
import styles from "./forgetPassword.module.scss";
//models
import { UserState } from "../../../models/UserState";
//apiHelper
import { FORGOT_PASSWORD_URL } from "../../../apiHelper";
//validations
import { emailValidationSchema } from "../../../utils/Validation";
import Layout from "../../../layout/NavLayout";
import { Particle } from "../../../layout/particles";
import ToastView from "../../../components/Toast";
import FormComponent from "../../../components/form";
import { RESET_PASSWORD_FIELDS } from "../../../constants/inputFields";

export const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values: UserState) => {
    setLoader(true);
    if (toast) {
      setToast(false);
    }
    try {
      await axios
        .put(FORGOT_PASSWORD_URL, {
          email: values.email,
        })
        .then((res) => {
          setLoader(false);
          setSuccess(true);
          setToast(true);
          setMessage(res.data.result.email);
        })
        .catch((error) => {
          setSuccess(false);
          setLoader(false);
          setToast(true);
          setMessage(error.response.data.message);
        });
    } catch (error) {
      setSuccess(false);
      setLoader(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };
  return (
    <Layout>
      <Particle>
        <div className={`${styles.container} `}>
          <FormComponent
            initialValues={initialValues}
            validations={emailValidationSchema}
            fields={RESET_PASSWORD_FIELDS}
            heading={"Reset Password"}
            subHeading={
              "Enter Your email address and we will send you instructions to reset your password. :)"
            }
            handleSubmit={handleSubmit}
            loader={loader}
          />
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

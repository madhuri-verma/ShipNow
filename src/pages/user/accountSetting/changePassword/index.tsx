import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//models
import { UserState } from "../../../../models/UserState";
//validations
import { changePasswordValidationSchema } from "../../../../utils/Validation";
//apiHelper
import { USER_CHANGE_PASSWORD_URL } from "../../../../apiHelper";
//components
import FormComponent from "../../../../components/form";
import ToastView from "../../../../components/Toast";
//constants
import { CHANGE_PASSWORD_FIELDS } from "../../../../constants/inputFields";
//CSS
import styles from "./changePassword.module.scss";

const ChangePassword = () => {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserState) => {
    try {
      await axios
        .put(
          USER_CHANGE_PASSWORD_URL,
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
          navigate("/user/setting", {
            state: {
              response: res.data.result.message,
            },
          });
        })
        .catch((error) => {
          setSuccess(false);
          setToast(true);
          setMessage(error.response.data.message);
        });
    } catch (error) {
      setSuccess(false);
      setToast(true);
      setMessage("Something is Wrong!");
    }
  };

  return (
    <div className={`${styles.container}`}>
      <FormComponent
        initialValues={initialValues}
        validations={changePasswordValidationSchema}
        fields={CHANGE_PASSWORD_FIELDS}
        heading={"Change Password"}
        subHeading={"Enter the details to change your password :)"}
        handleSubmit={handleSubmit}
        loader={loader}
      />
      {toast ? (
        <ToastView message={message} success={success} setToast={setToast} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChangePassword;

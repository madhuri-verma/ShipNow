import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
//css
import styles from "./packageSelectionGuest.module.scss";
//common
import Button from "../../../common/button/index";
//models
import { GuestState } from "../../../models/GuestState";
//apiHelper
import { GUEST_PACKAGE_QUOTE_URL } from "../../../apiHelper";
//validations
import { GuestPackageValidationSchema } from "../../../utils/Validation";
//components
import ToastView from "../../../components/Toast";

export const PackageSelectionGuest = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const initialValues = {
    fromCity: "",
    toCity: "",
    name: "",
    phone: "",
    email: "",
    package: "",
    totalWeight: "",
  };

  const handleSubmit = async (values: GuestState) => {
    setLoading(true);
    try {
      await axios
        .post(GUEST_PACKAGE_QUOTE_URL, {
          ...values,
        })
        .then((res) => {
          setSuccess(true);
          setLoading(false);
          setToast(true);
          setMessage(res.data.result.message);
          values.fromCity = "";
          values.toCity = "";
          values.name = "";
          values.email = "";
          values.phone = "";
          values.package = "";
          values.totalWeight = "";
        })
        .catch((error) => {
          setSuccess(false);
          setToast(true);
          setLoading(false);
          setMessage("Something is Wrong!" + error);
        });
    } catch (error) {
      setToast(true);
      setSuccess(false);
      setLoading(false);
      setMessage("Something is Wrong!" + error);
    }
  };

  return (
    <>
      <Formik<GuestState>
        initialValues={initialValues}
        validationSchema={GuestPackageValidationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className={`${styles.container}`}
          >
            <div className={`${styles.content}`}>
              <label htmlFor="fromCity">
                From City
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className={`${styles.input} input`}
                type="text"
                name="fromCity"
                placeholder="From City "
                id="fromCity"
              />
              <ErrorMessage
                name="fromCity"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.content}`}>
              <label htmlFor="toCity">
                To City
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className={`${styles.input} input`}
                type="text"
                name="toCity"
                placeholder="To City"
                id="toCity"
              />
              <ErrorMessage
                name="toCity"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.content}`}>
              <label htmlFor="packages">
                Packages
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className={`${styles.input} input`}
                type="number"
                name="package"
                placeholder="Package"
                id="packages"
                min="1"
              />
              <ErrorMessage
                name="package"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div className={`${styles.content}`}>
              <label htmlFor="weight">
                Total Weight
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <Field
                className={`${styles.input} input`}
                type="text"
                name="totalWeight"
                placeholder="Weight"
                id="weight"
              />
              <ErrorMessage
                name="totalWeight"
                component="div"
                className={`${styles.error} error`}
              />
            </div>
            <div
              role="group"
              aria-labelledby="contact"
              className={`${styles.contactContainer} `}
            >
              <label id="contact">
                Contact Information
                <span className="required-asterisk" aria-label="required">
                  *
                </span>
              </label>
              <div className={`${styles.contactContent} d-flex-r`}>
                <div className={`${styles.inputContainer}`}>
                  <Field
                    className={`${styles.contactInput} input`}
                    type="text"
                    name="name"
                    placeholder="Name"
                    id="name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>
                <div className={`${styles.inputContainer}`}>
                  <Field
                    className={`${styles.contactInput} input`}
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>
                <div className={`${styles.inputContainer}`}>
                  <Field
                    className={`${styles.contactInput} input`}
                    type="text"
                    name="email"
                    placeholder="Email"
                    id="email"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={`${styles.error} error`}
                  />
                </div>
              </div>
            </div>
            <Button
              className={styles.homeSelectionButton}
              value={loading ? "Processing..." : "get quote"}
            />
          </form>
        )}
      </Formik>
      {toast ? <ToastView message={message} success={success} setToast={setToast}/> : ""}
    </>
  );
};

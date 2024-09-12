import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
//css
import styles from "./letter.module.scss";
//common
import Button from "../../../../common/button";
//apiHelper
import { LETTER_QUOTE_URL, POSTAL_URL } from "../../../../apiHelper";
//models
import { QuoteState } from "../../../../models/QuotesState";
//validations
import { letterValidationSchema } from "../../../../utils/Validation";
//components
import ToastView from "../../../../components/Toast";

const Letter = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = sessionStorage.getItem("token");
  const initialValues = {
    weight: "",
    unit: "",
    insuranceAmount: "",
    currency: "",
    agreeTerms: false,
    fromPostal: "",
    fromCity: "",
    fromProvince: "",
    fromCountry: "",
    toPostal: "",
    toCity: "",
    toProvince: "",
    toCountry: "",
  };
  const [postalCheck, setPostalCheck] = useState("");
  const [dropDown, setDropDown] = useState({
    unit: "",
    currency: "",
  });

  const [postalFrom, setPostalFrom] = useState({
    fromPostal: "",
    fromCity: "",
    fromProvince: "",
    fromCountry: "",
  });

  const [postalTo, setPostalTo] = useState({
    toPostal: "",
    toCity: "",
    toProvince: "",
    toCountry: "",
  });
  const navigate = useNavigate();
  const [postalFromError, setPostalFromError] = useState("");
  const [postalToError, setPostalToError] = useState("");

  const handleSubmit = async (values: any) => {
    setLoader(true);
    if (toast) {
      setToast(false);
    }
    const combined = {
      ...values,
      ...postalFrom,
      ...postalTo,
      ...dropDown,
    };
    try {
      await axios
        .post(LETTER_QUOTE_URL, combined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoader(false);
          setToast(true);
          setSuccess(true);
          setMessage(res.data.result.created);
        })
        .catch((er) => {
          setLoader(false);
          setToast(true);
          setSuccess(false);
          setMessage("Fields Are required");
        });
    } catch (error) {
      setLoader(false);
      setToast(true);
      setSuccess(false);
      setMessage("Something is Wrong!");
    }
  };

  const handlePostalFrom = async () => {
    try {
      await axios
        .post(POSTAL_URL, {
          code: postalFrom.fromPostal,
        })
        .then((res) => {
          const { city, country, province } = res.data.result;
          setPostalFromError("");
          setPostalFrom((prevState) => ({
            ...prevState,
            fromCity: city,
            fromCountry: country,
            fromProvince: province,
          }));

          
        })
        .catch((err) => {
          const message = err.response.data.error;
          setPostalFromError(message);
          setPostalFrom((prevState) => ({
            ...prevState,
            fromCity: "",
            fromCountry: "",
            fromProvince: "",
          }));
        });
    } catch (error) {
      setMessage("Something is wrong !");
    }
  };
  const handlePostalTo = async () => {
    try {
      await axios
        .post(POSTAL_URL, {
          code: postalTo.toPostal,
        })
        .then((res) => {
          const { city, country, province } = res.data.result;
          setPostalToError("");
          setPostalTo((prevState) => ({
            ...prevState,
            toCity: city,
            toCountry: country,
            toProvince: province,
          }));
        })
        .catch((err) => {
          const message = err.response.data.error;
          setPostalToError(message);
          setPostalTo((prevState) => ({
            ...prevState,
            toCity: "",
            toCountry: "",
            toProvince: "",
          }));
        });
    } catch (error) {
      setMessage("Something is Wrong!");
    }
  };

  function handleChange(
   e: React.ChangeEvent<any>
  ) {

    console.log(e)
    // const { name, value } = event.target;
    // if (postalCheck === "fromPostal") {
    //   setPostalCheck("from");
    //   setPostalFrom((postalFrom) => ({
    //     ...postalFrom,
    //     [name]: value,
    //   }));
    // } else {
    //   setPostalCheck("to");
    //   setPostalTo((postalTo) => ({
    //     ...postalTo,
    //     [name]: value,
    //   }));
    // }
    if (postalCheck === "from") {
      handlePostalFrom();
    } else if (postalCheck === "to") {
      handlePostalTo();
    }
  }

  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDropDown({
      ...dropDown,
      [name]: value,
    });
  };

  useEffect(() => {
    if (postalCheck === "from") {
      handlePostalFrom();
    } else if (postalCheck === "to") {
      handlePostalTo();
    }
  }, [postalFrom.fromPostal, postalTo.toPostal]);

  return (
    <Formik<QuoteState>
      initialValues={initialValues}
      validationSchema={letterValidationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className={`${styles.form} form `} onSubmit={formik.handleSubmit}>
          <div className={`${styles.container} m-2 d-flex-r`}>
            <div className={`${styles.innerContainer} d-flex-col w-50 `}>
              <div className={`${styles.fromDiv} d-flex-col `}>
                <h6 className="mb-3">
                  Shipping From
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </h6>
                <div className="d-flex-col">
                  <Field
                    className="w-100 input"
                    type="text"
                    name="fromPostal"
                    placeholder="Postal Code"
                    id="fromPostal"
                    value={formik.values.fromPostal}
                    onChange={(e:any)=>formik.handleChange(e)}
                  />
                  {postalFromError ? (
                    <h6 className="error">{postalFromError}</h6>
                  ) : (
                    ""
                  )}
                </div>
                <div className={`${styles.portalContent}  d-flex-r`}>
                  <div>
                    <Field
                      className="input"
                      type="text"
                      name="fromCity"
                      placeholder="City"
                      value={formik.values.fromCity}
                      onChange={(e:any)=>formik.handleChange(e)}
                      id="PostalFromCity"
                    />
                    <ErrorMessage
                      name="fromCity"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div>
                    <Field
                      className="input"
                      type="text"
                      name="fromProvince"
                      onChange={(e:any)=>formik.handleChange(e)}
                      value={formik.values.fromProvince}
                      placeholder="Province"
                      id="PostalFromProvince"
                    />
                    <ErrorMessage
                      name="fromProvince"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div>
                    <Field
                      className="input"
                      type="text"
                      name="fromCountry"
                      placeholder="Country"
                      value={formik.values.fromCountry}
                      onChange={(e:any)=>formik.handleChange(e)}
                      id="PostalFromCountry"
                    />
                    <ErrorMessage
                      name="fromCountry"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                </div>
              </div>
              <div className={`${styles.packageContainer} `}>
                <h6>
                  Package Details
                  <span className="required-asterisk" aria-label="required">
                    *
                  </span>
                </h6>
                <div className={`${styles.innerPackage}  d-flex-r`}>
                  <div className={`w-50 d-flex-col`}>
                    <label htmlFor="weight">
                      Weight
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                      className="w-100 input"
                      name="weight"
                      type="text"
                      id="weight"
                      placeholder="weight"
                      min="1"
                    />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                  <div className={`${styles.unitDiv}  d-flex-col`}>
                    <label htmlFor="unit">
                      Unit
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <select
                      className={`w-100 d-flex-col `}
                      name="unit"
                      onChange={handleDropdown}
                      value={dropDown.unit}
                      id="unit"
                    >
                      <option value="kg">kg</option>
                      <option value="LBS">LBS</option>
                      <option value="gm">g</option>
                      <option value="mg">mg</option>
                    </select>
                    <ErrorMessage
                      name="unit"
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={`${styles.innerContainer} d-flex-col w-100`}>
                <div className={`${styles.fromDiv} d-flex-col`}>
                  <h6 className="mb-3">
                    Shipping To
                    <span className="required-asterisk" aria-label="required">
                      *
                    </span>
                  </h6>
                  <div className="d-flex-col">
                    <Field
                      className="w-100 input"
                      type="text"
                      name="toPostal"
                      placeholder=" Postal Code"
                      value={formik.values.toPostal}
                       onChange={(e:any) => formik.handleChange(e)}
                      id="toPostal"
                    />
                    {postalToError ? (
                      <h6 className="error">{postalToError}</h6>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={`${styles.portalContent}  d-flex-r`}>
                    <div>
                      <Field
                        type="text"
                        className="input"
                        name="toCity"
                        placeholder="City"
                        value={formik.values.toCity}
                        onChange={formik.handleChange}
                        id="postalToCity"
                      />
                      <ErrorMessage
                        name="toCity"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="toProvince"
                        placeholder="Province"
                        className="input"
                        value={formik.values.toProvince}
                        onChange={formik.handleChange}
                        id="postalToProvince"
                      />
                      <ErrorMessage
                        name="toProvince"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="toCountry"
                        className="input"
                        placeholder="Country"
                        value={formik.values.toCountry}
                        onChange={formik.handleChange}
                        id="postalToCountry"
                      />
                      <ErrorMessage
                        name="toCountry"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`${styles.insuranceContainer}  d-flex-r`}>
                    <div className={`${styles.currency} w-25  d-flex-col`}>
                      <label htmlFor="insurance">
                        Insurance
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        type="text"
                        name="insurance"
                        className="input"
                        placeholder=" Amount"
                        id="insurance"
                        min="0"
                      />
                      <ErrorMessage
                        name="insurance"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className={`${styles.currency} w-25  d-flex-col`}>
                      <label htmlFor="currency">
                        Currency
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <select
                        name="currency"
                        onChange={handleDropdown}
                        value={dropDown.currency}
                        id="currency"
                        className="select"
                      >
                        <option value="CAD">CAD</option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <ErrorMessage
                        name="currency"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div
                      className={`${
                        (styles.currency, styles.checkbox)
                      } mt-4  d-flex-r`}
                    >
                      <Field
                        className={`${styles.check} m-2`}
                        type="checkbox"
                        name="agreeTerms"
                        id="terms"
                      />

                      <span className="d-flex-col">
                        <label htmlFor="terms">
                          I have read and agree with the
                        </label>
                        <NavLink to={""}> terms and conditions</NavLink>
                        <ErrorMessage
                          name="agreeTerms"
                          component="div"
                          className={`${styles.error} error`}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              className={`${styles.submitBtn}`}
              value={loader ? "Processing.." : "get Quote"}
            />
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
        </Form>
      )}
    </Formik>
  );
};

export default Letter;

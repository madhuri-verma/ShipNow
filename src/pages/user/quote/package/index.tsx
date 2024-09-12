import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
//css
import styles from "../letter/letter.module.scss";
//common
import Button from "../../../../common/button";
//apiHelper
import { PACKAGE_QUOTE_URL, POSTAL_URL } from "../../../../apiHelper";
//models
import { QuoteState } from "../../../../models/QuotesState";
//validations
import { letterValidationSchema } from "../../../../utils/Validation";
//components
import ToastView from "../../../../components/Toast";

const Package = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);
  const initialValues = {
    weight: "",
    unit: "",
    insurance: "",
    currency: "",
    agreeTerms: false,
    toPostal: "",
    toCity: "",
    toProvince: "",
    toCountry: "",
    fromPostal: "",
    fromCity: "",
    fromProvince: "",
    fromCountry: "",
   
  };
  const [postalCheck, setPostalCheck] = useState("");
  const [dropDown, setDropDown] = useState({
    unit: "",
    measurement: "",
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

  const [postalFromError, setPostalFromError] = useState("");
  const [postalToError, setPostalToError] = useState("");

  const handleSubmit = async (values: any) => {
    setLoader(true)
    const combined = {
      ...values,
      ...postalFrom,
      ...postalTo,
      ...dropDown,
    };
    try {
      await axios
        .post(PACKAGE_QUOTE_URL, combined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setToast(true)
          setSuccess(true)
          setLoader(false)
          setMessage(res.data.result.message)
        })
        .catch((er) => {
          setToast(true)
          setSuccess(false)
          setLoader(false)
          setMessage("All Fields Are Required");
        });
    } catch (error) {
      setMessage("Something is Wrong !");
    }
  };

  const handleDrop = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDropDown({
      ...dropDown,
      [name]: value,
    });
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
      setMessage("Something is Wrong !");
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
      setMessage("Something is wrong !");
    }
  };

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
    postalCheck: string
  ): void {
    const { name, value } = event.target;
    if (postalCheck === "fromPostal") {
      setPostalCheck("from");
      setPostalFrom((postalFrom) => ({
        ...postalFrom,
        [name]: value,
      }));
    } else {
      setPostalCheck("to");
      setPostalTo((postalTo) => ({
        ...postalTo,
        [name]: value,
      }));
    }
  }

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
        <>
          <Form
            className={`${styles.form} form `}
            onSubmit={formik.handleSubmit}
          >
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
                    <input
                      className="w-100 input"
                      type="text"
                      name="fromPostal"
                      id="fromPostal"
                      placeholder="Postal Code"
                      value={postalFrom.fromPostal}
                      onChange={(e) => handleChange(e, "fromPostal")}
                    />
                    {postalFromError ? (
                      <h6 className="error">{postalFromError}</h6>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={`${styles.portalContent}  d-flex-r`}>
                    <Field
                      className="input"
                      type="text"
                      name="fromCity"
                      placeholder="City"
                      id="fromCity"
                      value={postalFrom.fromCity}
                      onChange={handleChange}
                    />
                     <ErrorMessage
                        name="fromCity"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    <Field
                      className="input"
                      type="text"
                      name="fromProvince"
                      id="fromProvince"
                      onChange={handleChange}
                      value={postalFrom.fromProvince}
                      placeholder="Province"
                    />
                    <Field
                      className="input"
                      type="text"
                      name="fromCountry"
                      id="fromCountry"
                      placeholder="Country"
                      value={postalFrom.fromCountry}
                      onChange={handleChange}
                    />
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
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <Field
                        className="w-100 input"
                        name="weight"
                        type="number"
                        id="weight"
                        placeholder="weight"
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className={`${styles.unitDiv}  d-flex-col`}>
                      <label htmlFor="measurement">
                        Measurement
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <select
                        className={`w-100 d-flex-col select`}
                        name="measurement"
                        id="measurement"
                        onChange={handleDrop}
                      >
                        <option value="kg">cm</option>
                        <option value="LBS">inches</option>
                        <option value="kg">meter</option>
                        <option value="kg">litre</option>
                      </select>
                      <ErrorMessage
                        name="unit"
                        component="div"
                        className={`${styles.error} error`}
                      />
                    </div>
                    <div className={`${styles.unitDiv}  d-flex-col`}>
                      <label htmlFor="unit">
                        Unit
                        <span
                          className="required-asterisk"
                          aria-label="required"
                        >
                          *
                        </span>
                      </label>
                      <select
                        className={`w-100 d-flex-col select`}
                        name="unit"
                        id="unit"
                        onChange={handleDrop}
                      >
                        <option value="kg">kg</option>
                        <option value="LBS">LBS</option>
                        <option value="kg">gram</option>
                        <option value="kg">mg</option>
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
                      <input
                        className="w-100 input"
                        type="text"
                        name="toPostal"
                        id="toPostal"
                        placeholder=" Postal Code"
                        value={postalTo.toPostal}
                        onChange={(e) => handleChange(e, "toPostal")}
                      />
                      {postalToError ? (
                        <h6 className="error">{postalToError}</h6>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={`${styles.portalContent} d-flex-r`}>
                      <Field
                        className="input"
                        type="text"
                        name="toCity"
                        id="toCity"
                        placeholder="City"
                        value={postalTo.toCity}
                        onChange={handleChange}
                      />
                      <Field
                        className="input"
                        type="text"
                        name="toProvince"
                        id="toProvince"
                        placeholder="Province"
                        value={postalTo.toProvince}
                        onChange={handleChange}
                      />
                      <Field
                        className="input"
                        type="text"
                        name="toCountry"
                        placeholder="Country"
                        id="toCountry"
                        value={postalTo.toCountry}
                        onChange={handleChange}
                      />
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
                          className="input"
                          type="text"
                          name="insurance"
                          placeholder="Amount"
                          id="insurance"
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
                          className="select"
                          name="currency"
                          id="currency"
                          onChange={handleDrop}
                        >
                          <option value="CAD">CAD</option>
                          <option value="LBS">USD</option>
                          <option value="kg">INR</option>
                          <option value="kg">EUR</option>
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
                          className={`${styles.check} m-2 input`}
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
              <Button className={`${styles.submitBtn}`} value={loader?'Processing..':"Get Quote"} />
            </div>
            {toast ? <ToastView message={message} success={success} setToast = {setToast}/> : ""}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default Package;

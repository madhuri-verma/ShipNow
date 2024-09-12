import styles from "./form.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { InputFields, UserState } from "../../models/UserState";
import Button from "../../common/button";

const FormComponent = (props: JSX.Element | any) => {
  const { handleSubmit, fields } = props;
  return ( 
      <Formik<UserState>
        initialValues={props.initialValues}
        validationSchema={props.validation}
        onSubmit={handleSubmit}
      >
        {(formik) => 
       (
          <form className={` ${styles.form} `} onSubmit={formik.handleSubmit}>
            <h4 className="m-1">{props.heading}</h4>
            <p className={` ${styles.para} m-2`}>{props.subHeading}</p>

            {fields
              ? fields.map((item:InputFields) => (
                  <div className={`${styles.formContent}`}>
                    <label htmlFor={item.id}>
                      {item.labelName}
                      <span className="required-asterisk" aria-label="required">
                        *
                      </span>
                    </label>
                    <Field
                    className='input'
                      name={item.id}
                      type={item.type}
                      id={item.id}
                    />
                    <ErrorMessage
                      name={item.id}
                      component="div"
                      className={`${styles.error} error`}
                    />
                  </div>
                ))
              : ""}

            <div className={`${styles.submit}`}>
              <Button className={`${styles.forgotBtn}`} value={props.loader?'Processing..':'Continue'} />
            </div>
          </form>
        )}
      
      </Formik>

  );
};

export default FormComponent;

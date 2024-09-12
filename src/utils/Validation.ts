import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  firstName: Yup.string()
    .required("First Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  number: Yup.string()
    .matches(/^\d+$/, " must contain only numbers")
    .min(10, "Number must be greater than or equal to 10")
    .required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special symbol"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password can be at most 16 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const letterValidationSchema = Yup.object().shape({
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be positive")
    .min(0.1, "Weight must be at least 0.1")
    .max(1000, "Weight cannot exceed 1000"),
  insurance: Yup.number()
    .required("Insurance is required")
    .typeError("Insurance Amount must be a number")
    .positive("Insurance Amount must be positive")
    .min(0, "Insurance Amount cannot be negative"),
  agreeTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  fromPostal: Yup.string().required("From Postal is required"),

  fromCity: Yup.string().required("From City is required"),

  fromProvince: Yup.string().required("From Province is required"),

  fromCountry: Yup.string().required("From Country is required"),

  toPostal: Yup.string().required("To Postal is required"),

  toCity: Yup.string().required("To City is required"),

  toProvince: Yup.string().required("To Province is required"),

  toCountry: Yup.string().required("To Country is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special symbol"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password can be at most 16 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special symbol"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password can be at most 16 characters long")
    .test(
      "notSameAsNewPassword",
      "Old password cannot be the same as the new password",
      function (value) {
        return value !== this.parent.newPassword;
      }
    ),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .matches(/(?=.*\d)/, "Password must contain at least one number")
    .matches(
      /(?=.*[@$!%*?&])/,
      "Password must contain at least one special symbol"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(16, "Password can be at most 16 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const GuestLetterValidationSchema = Yup.object().shape({
  fromCity: Yup.string().required("From City is required"),
  toCity: Yup.string().required("To City is required"),
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  phone: Yup.string()
    .matches(/^\d+$/, " must contain only numbers")
    .min(10, "must be greater than or equal to 10")
    .required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export const GuestPackageValidationSchema = Yup.object().shape({
  fromCity: Yup.string().required("From City is required"),
  toCity: Yup.string().required("To City is required"),
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-Za-z]+$/,
      "First Name must contain only alphabetic characters"
    ),
  package: Yup.number()
    .min(1, "Package can not be zero")
    .required("Package is required"),
  totalWeight: Yup.string().required("Total Weight is required"),
  phone: Yup.string()
    .matches(/^\d+$/, " must contain only digits")
    .min(10, " must be greater than or equal to 10")
    .required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

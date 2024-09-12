import { InputFields } from "../models/UserState";

export const CHANGE_PASSWORD_FIELDS: InputFields[] = [
  {
    id: "oldPassword",
    labelName: "Old Password",
    type: "password",
  },
  {
    id: "newPassword",
    labelName: "New Password",
    type: "password",
  },
  {
    id: "confirmPassword",
    labelName: "confirm Password",
    type: "password",
  },
];
export const RESET_PASSWORD_FIELDS: InputFields[] = [
  {
    id: "email",
    labelName: "Email",
    type: "email",
  },
];

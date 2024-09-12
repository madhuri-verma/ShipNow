export interface UserState {
  companyName?: string;
  firstName?: string;
  lastName?: string;
  number?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  oldPassword?: string;
}
export interface InputFields{
  id: string,
  labelName:string,
  type: string
}
export interface User {
  user: UserState[];
  loggedInUser: string;
  error: string;
  success: boolean;
}

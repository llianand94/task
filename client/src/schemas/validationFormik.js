import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
  email: Yup.string().email("Email should be valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars minimum"),
})
import * as yup from "yup";
// yup signInSchema
const signUpSchema = yup.object().shape({
  userName: yup
    .string()
    .min(4, "User name must be at least 4 characters")
    .required("User name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup
    .string() // Specifies that the input must be a string
    .required("Password is required") // Specifies that the input is required and provides an error message if it is not provided
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Specifies a regular expression pattern that the password must match
      "Password must be at least : 8 chars, 1 UPPERCASE, 1 lowercase, 1 numeric digit" // Provides an error message if the input does not match the regular expression pattern
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

export default signUpSchema;

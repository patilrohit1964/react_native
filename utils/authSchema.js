import * as Yup from "yup";
const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("password is required")
    .min(4, "Password must be at least 4 charchters long"),
});
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid Email format"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 6 charchters long"),
});

export { signUpSchema, signInSchema };

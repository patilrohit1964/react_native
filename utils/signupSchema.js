import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("password is required")
    .min(4, "Password must be at least 6 charchters long"),
});

export const validationsSchema = {
  validationSchema,
};

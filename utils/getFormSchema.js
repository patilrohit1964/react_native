import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  fullName: Yup.string().required("fullName is required"),
  phoneNumber: Yup.string()
    .required("phoneNumber is required")
    .matches(/^[0-9]+$/, "Phone Number must be digit")
    .min(10, "Password must be at least 4 charchters long"),
});
export { validationSchema };

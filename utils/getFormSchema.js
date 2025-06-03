import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  fullName: Yup.string().required("fullName is required"),
  phoneNumber: Yup.string()
    .required("phoneNumber is required")
    .matches(/^[0-9]+$/, "Phone Number must be digits")
    .min(10, "Phone Number must be digits"),
});
export { validationSchema };

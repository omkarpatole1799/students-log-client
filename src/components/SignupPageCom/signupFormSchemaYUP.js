import * as Yup from "yup";

const signupFormSchemaYUP = Yup.object().shape({
  name: Yup.string("Name should not contain numbers")
    .min(2, "Mininum 2 charactors required")
    .required("Please enter name"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  mobile: Yup.string()
    .min(10, "10 digit mobile no")
    .max(10, "10 digit mobile no")
    .required("Mobile no required"),
  address: Yup.string().required("Address required"),
  password: Yup.string()
    .min(8, "Password min 8 charactors")
    .required("Password is required"),
});

export default signupFormSchemaYUP;

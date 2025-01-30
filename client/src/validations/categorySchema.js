import * as Yup from "yup";

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});

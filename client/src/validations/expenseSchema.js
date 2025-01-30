import * as Yup from "yup";

export const expenseValidationSchema = Yup.object().shape({
  user_id: Yup.object().required("User is required"),
  category_id: Yup.object().required("Category is required"),
  amount: Yup.number().required("Amount is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
});

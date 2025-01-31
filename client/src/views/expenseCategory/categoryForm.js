import { Form, Formik } from "formik";
import React from "react";
import Dialog from "../../components/ui/dialog";
import {
  addCategory,
  updateCategory,
} from "../../services/expenseCategoryService";
import { categoryValidationSchema } from "../../validations/categorySchema";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import useToast from "../../hooks/useToast";

const CategoryForm = (props) => {
  const { isOpen, onClose, setFlag, type = "add", data = {} } = props;
  const { successToast, errorToast } = useToast();
  const onSave = async (values, setSubmitting) => {
    setSubmitting(true);
    const payload = {
      name: values?.name,
    };
    let resp;
    try {
      if (type === "edit") {
        // called edit api
        resp = await updateCategory(data?.id, payload);
      } else {
        // called add api
        resp = await addCategory(payload);
      }

      if (resp.success) {
        successToast(resp?.message);
      }
    } catch (err) {
      console.log("err", err);
      errorToast(resp?.message || resp?.error?.message);
    } finally {
      setSubmitting(false);
      setFlag(true);
      onClose();
    }
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onClose}
        width={600}
      >
        <div className="mb-4 text-xl font-bold">{`${
          type === "edit" ? "Update" : "Add"
        } Expense Category`}</div>
        <Formik
          initialValues={{
            name: data?.name,
          }}
          validationSchema={categoryValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSave(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting, handleChange }) => (
            <Form>
              <div>
                <Input
                  label="Category Name"
                  type="text"
                  placeholder="Enter category name"
                  size="medium"
                  name="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name && touched.name}
                  errorMessage={errors.name}
                />
              </div>

              <div className="flex justify-end items-center mt-4">
                <Button
                  size="sm"
                  variant="outlined"
                  type="submit"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="contained"
                  loading={isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CategoryForm;

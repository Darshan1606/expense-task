import { Form, Formik } from "formik";
import React from "react";
import Dialog from "../../components/ui/dialog";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { addUser, updateUser } from "../../services/userService";
import { userValidationSchema } from "../../validations/userSchema";
import useToast from "../../hooks/useToast";

const UserForm = (props) => {
  const { isOpen, onClose, setFlag, type = "add", data = {} } = props;
  const { successToast, errorToast } = useToast();
  const onSave = async (values, setSubmitting) => {
    setSubmitting(true);
    const payload = {
      name: values?.name,
      email: values?.email,
    };

    let resp;
    try {
      if (type === "edit") {
        // called edit api
        resp = await updateUser(data?.id, payload);
      } else {
        // called add api
        resp = await addUser(payload);
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
          type === "edit" ? "Update" : "Create"
        } User`}</div>
        <Formik
          initialValues={{
            name: data?.name,
            email: data?.email,
          }}
          validationSchema={userValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await onSave(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, isSubmitting, handleChange }) => (
            <Form>
              <div className="my-2">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Enter user name"
                  size="medium"
                  name="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name && touched.name}
                  errorMessage={errors.name}
                />
              </div>
              <div className="my-2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter user email"
                  size="medium"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  errorMessage={errors.email}
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

export default UserForm;

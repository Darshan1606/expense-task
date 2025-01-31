import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Dialog from "../../components/ui/dialog";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { expenseValidationSchema } from "../../validations/expenseSchema";
import SelectField from "../../components/ui/select";
import {
  addExpense,
  getAllConfig,
  updateExpense,
} from "../../services/expenseService";
import useToast from "../../hooks/useToast";

const ExpenseForm = (props) => {
  const { isOpen, onClose, setFlag, type = "add", data = {} } = props;
  const { successToast, errorToast } = useToast();
  const [config, setConfig] = useState({
    users: [],
    categories: [],
  });
  const [loadConfig, setLoadConfig] = useState(false);
  
  const getConfig = async () => {
    try {
      setLoadConfig(true);
      const resp = await getAllConfig();
      if (resp.success) {
        setConfig({
          users: resp?.data?.users || [],
          categories: resp?.data?.categories || [],
        });
      }
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoadConfig(false);
    }
  };

  useEffect(() => {
    getConfig();
  }, [isOpen]);

  const onSave = async (values, setSubmitting) => {
    setSubmitting(true);
    const payload = {
      user_id: values?.user_id?.value,
      category_id: values?.category_id?.value,
      amount: values?.amount,
      date: values?.date,
      description: values?.description,
    };

    let resp;
    try {
      if (type === "edit") {
        // called edit api
        resp = await updateExpense(data?.id, payload);
      } else {
        // called add api
        resp = await addExpense(payload);
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
  console.log(
    "first",
    data?.user_id
      ? config?.users?.find((item) => item.id === data?.user_id)
      : ""
  );
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
        } Expense`}</div>
        {loadConfig ? (
          <>Loading...</>
        ) : (
          <Formik
            initialValues={{
              user_id: data?.user_id
                ? { value: data?.user_id, label: data?.user_name }
                : "",
              category_id: data?.category_id
                ? { value: data?.category_id, label: data?.category_name }
                : "",
              amount: data?.amount || "",
              date: new Date(data?.date) || new Date(),
              description: data?.description || "",
            }}
            validationSchema={expenseValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await onSave(values, setSubmitting);
            }}
          >
            {({ values, touched, errors, isSubmitting, handleChange }) => (
              <Form>
                {console.log("values", values)}
                <div className="grid grid-cols-2 gap-4">
                  <div className="my-2">
                    <Field name="category_id">
                      {({ field, form }) => (
                        <SelectField
                          type="category_id"
                          field={field}
                          form={form}
                          value={field.value}
                          name="category_id"
                          labelName="Expense Category"
                          placeholder="Select Expense Category"
                          options={config?.categories}
                          onChange={(val) => {
                            form.setFieldValue("category_id", val);
                          }}
                          error={errors.category_id && touched.category_id}
                          errorMessage={errors.category_id}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="my-2">
                    <Field name="user_id">
                      {({ field, form }) => (
                        <SelectField
                          type="user_id"
                          field={field}
                          form={form}
                          value={field.value}
                          name="user_id"
                          labelName="User"
                          placeholder="Select User"
                          options={config?.users}
                          onChange={(val) => {
                            form.setFieldValue("user_id", val);
                          }}
                          error={errors.user_id && touched.user_id}
                          errorMessage={errors.user_id}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="my-2">
                    <Input
                      label="Amount"
                      type="number"
                      placeholder="Enter amount"
                      size="medium"
                      name="amount"
                      autoComplete="off"
                      value={values.amount}
                      onChange={handleChange}
                      error={errors.amount && touched.amount}
                      errorMessage={errors.amount}
                    />
                  </div>
                  <div className="my-2">
                    <Input
                      label="Date"
                      type="date"
                      placeholder="Select date"
                      size="medium"
                      name="date"
                      autoComplete="off"
                      value={new Date(values.date)}
                      onChange={handleChange}
                      error={errors.date && touched.date}
                      errorMessage={errors.date}
                    />
                  </div>
                </div>
                <div className="my-2">
                  <Input
                    label="Description"
                    type="text"
                    placeholder="Enter description"
                    size="medium"
                    name="description"
                    autoComplete="off"
                    value={values.description}
                    onChange={handleChange}
                    error={errors.description && touched.description}
                    errorMessage={errors.description}
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
        )}
      </Dialog>
    </>
  );
};

export default ExpenseForm;

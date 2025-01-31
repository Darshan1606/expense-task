import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { Form, Formik } from "formik";
import { loginSchema } from "../../validations/loginSchema";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import PasswordInput from "../../components/ui/passwordInput";
import { DASHBOARD_PREFIX_PATH } from "../../constants/route.constant";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);

  const onLogin = async (values, setSubmitting) => {
    setSubmitting(true);
    setLoading(true);
    try {
      const result = await signIn(values);
      if (result?.success) {
        successToast(result?.message);
        navigate(DASHBOARD_PREFIX_PATH);
      } else {
        errorToast(result?.message || result?.error?.message);
      }
    } catch (err) {
      console.log(err);
      errorToast(
        err?.response?.data?.error?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.message
      );
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto h-screen relative">
      <div className="w-[400px] px-6 py-8 sm:bg-white shadow-primary rounded-md ">
        <div className="my-8 text-center">
          <span className="text-lg font-bold text-primary-dark">
            Expense Tracker
          </span>
        </div>
        <div className="my-8 text-center">
          <span className="text-2xl font-bold">Login</span>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            onLogin(values, setSubmitting);
          }}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form>
              <div className="mb-8">
                <Input
                  label="Email"
                  type="text"
                  placeholder="Enter your email"
                  size="medium"
                  name="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  errorMessage={errors.email}
                />
              </div>
              <div className="mb-8">
                <PasswordInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  size="medium"
                  name="password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password && touched.password}
                  errorMessage={errors.password}
                />
              </div>
              <div className="text-center">
                <Button
                  className="rounded-lg text-white"
                  disabled={loading}
                  type="submit"
                  loading={loading}
                  width={120}
                  size="medium"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

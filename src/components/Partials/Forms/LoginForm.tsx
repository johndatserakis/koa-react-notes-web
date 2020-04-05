import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";

const validationSchema = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const LoginForm = () => {
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit(submitValues) {
      console.log(submitValues);
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="email"
        onChange={handleChange}
        value={values.email}
      />
      {errors.email ? errors.email : null}

      <Input.Password
        name="password"
        onChange={handleChange}
        value={values.password}
      />
      {errors.password ? errors.password : null}

      <button type="submit">Submit</button>
    </form>
  );
};

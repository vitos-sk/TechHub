import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form } from "../../ui-components";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { ValidationError } from "../../ui-components";
import { request } from "../../utils";

const authSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(255, "Email should be at most 255 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[A-Za-z0-9#%_]+$/,
      "Password should contain only latin letters, numbers and symbols # % _"
    )
    .min(6, "Password should be at least 6 characters long")
    .max(32, "Password should be at most 32 characters long"),
});

const AuthorizationContainer = ({ className }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(authSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState(null);

  const onSubmit = async ({ email, password }) => {
    try {
      const { error, user } = await request("/login", "POST", { email, password });

      if (error) {
        return setServerError(error);
      }

      dispatch(setUser(user));
      localStorage.setItem("userData", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setServerError(err.message || "Login failed");
    }
  };

  const formError = errors?.email?.message || errors?.password?.message;

  const errorMessage = serverError || formError;

  return (
    <div className={className}>
      <Form onSubmit={handleSubmit(onSubmit)} nameForm="Authorization">
        <Input
          type="text"
          placeholder="Email"
          {...register("email", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Button type="submit">Sign In</Button>

        <Link
          to="/registration"
          style={{ marginTop: "10px", color: "#4d4d4d", fontSize: "14px" }}
        >
          Don't have an account?
        </Link>
        {errorMessage && <ValidationError>{errorMessage}</ValidationError>}
      </Form>
    </div>
  );
};

const Authorization = styled(AuthorizationContainer)``;

export default Authorization;

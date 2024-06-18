import { Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { API_BASE_URL } from "../config/Constants";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
export const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (data, type = "login") => {
    try {
      const res = await axios.post(`${API_BASE_URL}/${type}`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404 && data.message === "Couldn't find user by your email") {
          toast.error("Email is incorrect.");
        } else if (status === 400 && data.message === "Incorrect password") {
          toast.error("Password is incorrect.");
        } else {
          toast.error("check your credentials.");
        }
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      return null;
    }
  };
  const onSubmit = async (data1) => {
    console.log(data1);
    if (isSignup) {
      const data = await sendRequest(data1, "signup");
      if (data) {
        setSignupSuccess(true);
        toast.success("Successfully signed up.");
      }
    } else {
      const data = await sendRequest(data1);
      if (data) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.login());
        navigate("/blogs");
        toast.success("Login Successfully");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              {...register("name", { required: "name is required" })}
              margin="normal"
            />
          )}
          <p>{formErrors.name?.message} </p>
          <TextField
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            margin="normal"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "this email is not valid",
              },
            })}
          />
          <p>{formErrors.email?.message} </p>
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            margin="normal"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 4,
                message: "minimum length of password is 4",
              },
              maxLength: {
                value: 8,
                message: "maximum length of password is 8",
              },
            })}
          />
          <p>{formErrors.password?.message} </p>
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Auth;

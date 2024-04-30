import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "./LoginPage.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../services/userServices";
import { Navigate, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address." })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atlest 8 characters" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  // let navigate = useNavigate();
  //   const form = useForm();
  const location = useLocation();
  console.log(location);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  //   console.log(register("name"));

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      // navigate("/");
      const { state } = location;
      window.location = state ? state.from : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  //   const [user, setUser] = useState({
  //     name: "",
  //     phone: "",
  //   });
  //   //   const passwordRef = useRef(null);
  //   //   const nameRef = useRef(null);
  //   //   const phoneRef = useRef(null);
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // const user = {
  //     //   name: "",
  //     //   phone,
  //     // };
  //     // user.name = nameRef.current.value;
  //     // user.phone = parseInt(phoneRef.current.value);
  //     console.log(user);
  //   };
  if (getUser()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="form_page align_center">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="forms_error">{errors.password.message}</em>
            )}
          </div>
          {/* <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              //   ref={nameRef}
              id="name"
              className="form_text_input"
              placeholder="Enter your name"
              //   onChange={(e) => setUser({ ...user, name: e.target.value })}
              //   value={user.name}
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name?.type === "required" && (
              <em className="forms_error">Please enter your name</em>
            )}
            {errors.name?.type === "minLength" && (
              <em className="forms_error">
                Name should be 3 or more characters
              </em>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              //   ref={phoneRef}
              id="phone"
              className="form_text_input"
              placeholder="Enter your phone number"
              //   onChange={(e) =>
              //     setUser({ ...user, phone: parseInt(e.target.value) })
              //   }
              //   value={user.phone}
              {...register("phone", { valueAsNumber: true })}
            />
          </div> */}
          {/* <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={passwordRef}
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "password")}
            >
              Hide password
            </button>
            <button
              type="button"
              onClick={() => (passwordRef.current.type = "text")}
            >
              Show password
            </button>
          </div> */}
          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="form_submit search_button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;

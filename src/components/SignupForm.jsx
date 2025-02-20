import React, { useState } from "react";
import "../App.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
    if (name === "password" && value.length < 8) error = "Password must be at least 8 characters";
    if (name === "confirmPassword" && value !== formData.password) error = "Passwords do not match";
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validate(field, formData[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Signup Successful!");
      setFormData({ email: "", password: "", confirmPassword: "" });
    } else {
      alert("Can't submit the form");
    }
  };

  const renderInput = (label, type, name) => (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={errors[name] ? "invalid" : formData[name] ? "valid" : ""}
        required
      />
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        {renderInput("Email", "email", "email")}
        {renderInput("Password", "password", "password")}
        {renderInput("Confirm Password", "password", "confirmPassword")}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

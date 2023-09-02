import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../services/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/userSlice";
//import "./style.css";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ name, phoneNo, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      // toast.success("Successfully Login");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <h1>Signup</h1>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Phone Number: </Form.Label>
          <Form.Control
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Enter Your Phone Number"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
        <p>
          Already an Account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </>
  );
}

export default Signup;

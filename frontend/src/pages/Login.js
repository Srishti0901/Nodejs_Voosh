import React, { useState } from "react";
//import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useLoginMutation } from "../services/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ phoneNo, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      //  toast.success("Successfully Login");
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number: </Form.Label>
          <Form.Control
            type="number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Enter Your Phone Number"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
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
          New User? <Link to="/signup">Signup</Link>
        </p>
      </Form>
    </>
  );
}

export default Login;

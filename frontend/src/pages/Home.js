import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../services/apiSlice";
//import "./style.css";

function Home() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [phoneNo, setPhoneNo] = useState("");
  const [subTotal, setSubTotal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_id = JSON.parse(localStorage.getItem("user"));
      // console.log(user_id);
      await addOrder({ user_id, phoneNo, subTotal }).unwrap();
      // toast.success("Successfully Login");
      navigate("/getorder");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Place Order</h1>
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
          <Form.Label>SubTotal: </Form.Label>
          <Form.Control
            type="number"
            value={subTotal}
            onChange={(e) => setSubTotal(e.target.value)}
            placeholder="Enter Total Product"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Home;

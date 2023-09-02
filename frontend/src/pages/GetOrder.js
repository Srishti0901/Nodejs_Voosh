import React, { useEffect, useState } from "react";
import { useGetOrderMutation } from "../services/apiSlice";

function GetOrder() {
  const [getOrder] = useGetOrderMutation();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getproduct() {
      try {
        const products = await getOrder().unwrap();
        // console.log(products);
        setData(products);
      } catch (e) {
        console.log(e);
      }
    }
    getproduct();
  }, [setData, getOrder]);

  return (
    <>
      <h1>All Order:</h1>
      <div>
        {data &&
          data.map((product, index) => (
            <div key={index}>
              <div>Phone Number: {product.phoneNo}</div>
              <div>SubTotal: {product.subTotal}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default GetOrder;

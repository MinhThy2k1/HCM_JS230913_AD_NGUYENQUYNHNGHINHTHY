/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Product from "./component/Products/Product";
import { v4 as uuidv4 } from "uuid";
import Datajs from "../data.json";
import Cart from "./component/carts/Cart";
// Import chuỗi từ file data.json

export default function App() {
  const [load, setLoad] = useState(false);

  return (
    <>
      <Product
        load={load}
        setLoad={setLoad}
        randomid={uuidv4}
        products={Datajs}
      />{" "}
      {/* Truyền chuỗi Datajs vào component Product */}
      <Cart load={load} />
    </>
  );
}

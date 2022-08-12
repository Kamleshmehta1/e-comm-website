import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result1 = await result.json();
    setName(result1.name);
    setPrice(result1.price);
    setCategory(result1.category);
    setCompany(result1.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result1 = await result.json();
    console.log(result1);
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        value={name}
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a Product Name"
      />
      <input
        type="text"
        value={price}
        className="inputBox"
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter a Price"
      />

      <input
        type="text"
        value={category}
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter a category"
      />

      <input
        type="text"
        value={company}
        className="inputBox"
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter a company"
      />

      <button className="appButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;

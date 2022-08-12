import React from "react";
import { useState } from "react";

function AddProducts() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [company, setCompany] = useState();
  const [error, setError] = useState(false);

  const handleAddProducts = async (e) => {
    console.log(name, price, category, company);

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const result = fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result1 = await (await result).json();
    console.log(result1);
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a Product Name"
      />
      {error && !name ? (
        <span className="invalid-input">Enter valid name</span>
      ) : null}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setPrice("$" + e.target.value)}
        placeholder="Enter a Price"
      />
      {error && !price ? (
        <span className="invalid-input">Enter valid price</span>
      ) : null}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter a category"
      />
      {error && !category ? (
        <span className="invalid-input">Enter valid category</span>
      ) : null}

      <input
        type="text"
        className="inputBox"
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter a company"
      />
      {error && !company ? (
        <span className="invalid-input">Enter valid company</span>
      ) : null}

      <button className="appButton" onClick={handleAddProducts}>
        Add Product
      </button>
    </div>
  );
}

export default AddProducts;

import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import trash from "./trash.png";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let result1 = await result.json();
    if (result1) {
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      let result1 = await result.json();
      if (result1) {
        setProducts(result1);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        onChange={handleSearch}
        placeholder="Search Product"
      />
      <ul>
        <li>Sr No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((ele, index) => (
          <ul key={ele._id} style={{ marginBottom: "1px" }}>
            <li>{index + 1}</li>
            <li>{ele.name}</li>
            <li>{ele.price}</li>
            <li>{ele.category}</li>
            <li>{ele.company}</li>
            <li className="li-delete">
              <button onClick={() => handleDelete(ele._id)}>delete</button>
              <Link to={`/update/${ele._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
}

export default ProductsList;

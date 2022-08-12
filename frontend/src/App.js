import "./App.css";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import AddProducts from "./Components/AddProducts";
import ProductsList from "./Components/ProductsList";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route
              path="/logout"
              element={<h1>Product logout Listing Component</h1>}
            />
            <Route
              path="/profile"
              element={<h1>Product profile Listing Component</h1>}
            />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

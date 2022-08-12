const express = require("express");
const app = express();
require("./db/config");
const User = require("./db/User");
// const { request, response } = require("express");
const cors = require("cors");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  let result1 = result.toObject();
  delete result1.password;
  Jwt.sign({ result1 }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({
        request: "Something went wrong please try again after sometime",
      });
    }
    resp.send({ result1, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            request: "Something went wrong please try again after sometime",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No user Found" });
    }
  } else {
    resp.send({ result: "No user Found" });
  }
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  let product = await Product.find();
  if (product.length > 0) {
    resp.send(product);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No record found." });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { price: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp
          .status(401)
          .send({ result: "Please provide valid token with header" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000);

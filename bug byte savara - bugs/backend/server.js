const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let USERS = [{ username: "user", password: "1234" }];
const ADMIN = { username: "admin", password: "1234" };

let products = [
  { id: 1, name: "MacBook Pro", price: 150000 },
  { id: 2, name: "iPhone", price: 80000 },
  { id: 3, name: "AirPods", price: 20000 },
];

let orders = [];

/* REGISTER */
app.post("/api/user/register", (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.json({ success: false });
  if (!password) return res.json({ success: false });
  const user = USERS.find(
    (u) => u.username === req.body.username && u.password === req.body.password,
  );
  if (user) {
    return res.json({ success: false });
  }
  USERS.push({ username, password }); // BUG
  console.log(USERS);
  res.json({ success: true });
});

/* LOGIN */
app.post("/api/user/login", (req, res) => {
  console.log();
  const user = USERS.find(
    (u) => u.username === req.body.username && u.password === req.body.password,
  );
  if (!user) {
    return res.json({ success: false });
  }
  res.json({ success: user }); // BUG
});

/* ADMIN */
app.post("/api/admin/login", (req, res) => {
  res.json({
    success:
      req.body.username === ADMIN.username &&
      req.body.password === ADMIN.password,
  }); // BUG
});

/* PRODUCTS */
app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  if (!name) return res.json({ success: false });
  if (!price) return res.json({ success: false });
  products.push({ id: Date.now(), ...req.body }); // BUG
  console.log(products);
  res.json({ success: true });
});

app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.json({ success: false });
  products = products.filter((p) => p.id !== id); // BUG
  console.log(products);
  res.json({ success: true });
});

/* ORDERS */
app.post("/api/orders", (req, res) => {
  if (!req.body) return res.json({ success: false });
  orders.push(req.body); // BUG
  console.log(orders);
  res.json({ success: true });
});

app.get("/api/orders", (req, res) => {
  console.log(orders);
  res.json(orders);
});

app.listen(5000, () => console.log("Server running on 5000"));

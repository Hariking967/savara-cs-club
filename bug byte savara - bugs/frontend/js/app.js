const API = "http://localhost:5000";

/* LOGIN */
async function userLogin() {
  const res = await fetch(API + "/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "home.html";
  } else {
    alert("Login failed");
  }
}

/* REGISTER */
async function register() {
  await fetch(API + "/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  window.location.href = "login.html";
}

/* PRODUCTS */
async function loadProducts() {
  const res = await fetch(API + "/api/products"); // BUG
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";
  if (data.length == 0) {
    list.innerHTML += `
      <div class="product">
        <h4>No products found</h4>
      </div>
    `;
  } else {
    data.forEach((p) => {
      list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Cart</button>
      </div>
    `;
    });
  }
}

/* load product admin */
async function loadProductsAdmin() {
  const res = await fetch(API + "/api/products"); // BUG
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";
  if (data.length == 0) {
    list.innerHTML += `
      <div class="product">
        <h4>No products found</h4>
      </div>
    `;
  } else {
    data.forEach((p) => {
      list.innerHTML += `
      <div class="product">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
      </div>
    `;
    });
  }
}

async function loadOrders() {
  const res = await fetch(API + "/api/orders"); // BUG
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";
  if (data.length == 0) {
    list.innerHTML += `
      <div class="orders">
        <h4>No orders found</h4>
      </div>
    `;
  } else {
    data.forEach((o) => {
      list.innerHTML += `
      <div class="orders">
        <h4>${o.name}</h4>
        <p>${o.card}</p>
      </div>
    `;
    });
  }
}

/* CART */
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cartItems", JSON.stringify(cart)); // BUG
}

/* ORDER */
async function placeOrder() {
  const items = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (!email.value) alert("Enter email");
  else if (!card.value) alert("Enter card number");
  else {
    await fetch(API + "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        name: email.value,
        card: card.value,
      }),
    });

    alert("Order placed!");
  }
}

/* ADMIN */
function checkAdmin() {
  if (!localStorage.getItem("admin")) return;
}

async function adminLogin() {
  const res = await fetch(API + "/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("admin", "true");
    window.location.href = "dashboard.html";
  }
}

async function AddProduct() {
  await fetch(API + "/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id.value,
      name: prodname.value,
      price: price.value,
    }),
  });
  window.location.href = "products.html";
}

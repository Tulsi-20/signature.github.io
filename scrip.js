// ---------- CART SYSTEM ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

// ---------- WISHLIST ----------
function addToWishlist(img, name, price) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if already in wishlist
    let exist = wishlist.find(item => item.name === name);
    if (exist) {
        alert("Already in wishlist ❤️");
        return;
    }

    wishlist.push({ img, name, price });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
    alert("Added to wishlist ❤️");
}



// ---------- VARIANT SELECTION ----------
let selectedSize = "";
let selectedColor = "";

function chooseSize(size) {
    selectedSize = size;
    document.getElementById("sizeDisplay").innerText = size;
}

function chooseColor(color) {
    selectedColor = color;
    document.getElementById("colorDisplay").innerText = color;
}

// ---------- CHECKOUT ----------
function goToCheckout() {
    window.location.href = "checkout.html";
}

// ---------- ADMIN (Simplified) ----------
function addProductAdmin() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;
    let img = document.getElementById("pimage").value;

    let newProduct = { name, price, img };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Added!");
}
// ---------- ORDER SYSTEM ----------
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let orderId = "ORD" + Math.floor(100000 + Math.random() * 900000); // unique ID

  let order = {
    id: orderId,
    items: cart,
    status: "Order Placed",
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart"); // empty cart
  alert("Order Placed! Your Order ID: " + orderId);

  window.location.href = "tracking.html";
}

// ---------- TRACK ORDER ----------
function trackOrder() {
  let id = document.getElementById("trackInput").value;
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let found = orders.find(o => o.id === id);

  if (!found) {
    document.getElementById("trackResult").innerHTML = "<p>❌ Order Not Found</p>";
    return;
  }

  document.getElementById("trackResult").innerHTML = `
    <h2>Order ID: ${found.id}</h2>
    <p><b>Status:</b> ${found.status}</p>
    <p><b>Date:</b> ${found.date}</p>

    <h3>Items:</h3>
    ${found.items.map(i => `
      <p>${i.name} (${i.size}/${i.color}) - ₹${i.price}</p>
    `).join("")}
  `;
}

// ---------- ADMIN UPDATE ORDER STATUS ----------
function updateOrderStatus() {
  let id = document.getElementById("oid").value;
  let status = document.getElementById("ostatus").value;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    alert("Order not found");
    return;
  }

  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Status Updated!");
}
// ---------- UPDATE ICON COUNTS ----------
function updateCounts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (document.getElementById("cartCount"))
        document.getElementById("cartCount").innerText = cart.length;

    if (document.getElementById("wishCount"))
        document.getElementById("wishCount").innerText = wishlist.length;
}

// Run on every page
document.addEventListener("DOMContentLoaded", updateCounts);
function addToCart(img, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        img: img,
        name: name,
        price: price,
        quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCounts();
    alert("Added to Cart 🛒");
}
// --------------- UPDATE ICON COUNTS ---------------
function updateCounts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (document.getElementById("cartCount"))
        document.getElementById("cartCount").innerText = cart.length;

    if (document.getElementById("wishCount"))
        document.getElementById("wishCount").innerText = wishlist.length;
}

document.addEventListener("DOMContentLoaded", updateCounts);


// --------------- ADD TO CART ---------------
function addToCart(img, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    let exist = cart.find(item => item.name === name);
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({
            img: img,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCounts();
    alert("Added to Cart 🛒");
}



// --------------- REMOVE ITEM ---------------
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCounts();
}


// --------------- CHANGE QUANTITY ---------------
function changeQty(index, type) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (type === "plus") {
        cart[index].quantity += 1;
    } 
    else if (type === "minus") {
        cart[index].quantity -= 1;
        if (cart[index].quantity < 1) cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCounts();
}


// --------------- LOAD CART PAGE ---------------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        html += `
        <div class="cart-item">
            <img src="${item.img}" class="cart-img">
            <div class="info">
              <h3>${item.name}</h3>
              <p>₹${item.price}</p>

              <div class="qty-box">
                <button onclick="changeQty(${index}, 'minus')">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 'plus')">+</button>
              </div>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">✖</button>
        </div>
        `;
    });

    document.getElementById("cartItems").innerHTML = html;
    document.getElementById("cartTotal").innerText = "₹" + total;
}


// --------------- CLEAR CART ---------------
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCounts();
}
// --------------- BUY NOW ---------------
function buyNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}
function addToCart(img, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    let exist = cart.find(item => item.name === name);
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({
            img: img,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCounts();
    alert("Added to Cart 🛒");
}

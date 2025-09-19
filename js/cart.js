let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

export function addToCart(product) {
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  items.innerHTML = "";
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - R$ ${item.price.toFixed(2)} x 
      <input type="number" min="1" value="${item.quantity}" data-id="${
      item.id
    }" /> 
      <button data-id="${item.id}">Remover</button></p>
    `;
    div.querySelector("input").addEventListener("change", (e) => {
      const qty = parseInt(e.target.value);
      const prod = cart.find((p) => p.id === item.id);
      prod.quantity = qty;
      saveCart();
      renderCart();
    });
    div
      .querySelector("button")
      .addEventListener("click", (e) => removeFromCart(item.id));
    items.appendChild(div);
  });
  total.textContent = `Total: R$ ${subtotal.toFixed(2)}`;
}

export function setupCart() {
  document.getElementById("cart-button").addEventListener("click", () => {
    renderCart();
    document.getElementById("cart-modal").classList.remove("hidden");
  });
  document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
  });
  updateCartCount();
}

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
  const itemsContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const cartFooter = document.getElementById("cart-footer");
  itemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    itemsContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "flex";

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-image" src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
      </div>
      <input type="number" class="cart-item-quantity" min="1" value="${
        item.quantity
      }" data-id="${item.id}" /> 
      <button class="cart-item-remove" data-id="${item.id}">&times;</button>
    `;

    div.querySelector(".cart-item-quantity").addEventListener("change", (e) => {
      const qty = parseInt(e.target.value);
      const prod = cart.find((p) => p.id === item.id);
      if (qty > 0) {
        prod.quantity = qty;
        saveCart();
        renderCart();
      }
    });

    div
      .querySelector(".cart-item-remove")
      .addEventListener("click", () => removeFromCart(item.id));
    itemsContainer.appendChild(div);
  });
  totalEl.textContent = `Total: $${subtotal.toFixed(2)}`;
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

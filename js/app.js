import { renderCatalog } from "./catalog.js";
import { setupCart } from "./cart.js";
import { setupCheckout } from "./checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupCart();
  setupCheckout();
});

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
});

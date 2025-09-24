// js/app.js
import { renderCatalog } from "./catalog.js";
import { setupCart } from "./cart.js";
import { setupCheckout } from "./checkout.js";

// This function is called when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupCart();
  setupCheckout();
});

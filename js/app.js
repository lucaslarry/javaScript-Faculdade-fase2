import { renderCatalog } from "./catalog.js";
import { setupCart } from "./cart.js";
import { setupCheckout } from "./checkout.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupCart();
  setupCheckout();
});

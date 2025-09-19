import { products } from "./data.js";
import { addToCart } from "./cart.js";

export function renderCatalog() {
  const catalog = document.getElementById("catalog");
  const filterCategory = document.getElementById("filter-category");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  const categories = [...new Set(products.map((p) => p.category))];
  categories.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filterCategory.appendChild(opt);
  });

  function displayProducts(list) {
    catalog.innerHTML = "";
    list.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Detalhes</button>
      `;
      card
        .querySelector("button")
        .addEventListener("click", () => showProduct(product));
      catalog.appendChild(card);
    });
  }

  function showProduct(product) {
    const modal = document.getElementById("product-modal");
    const details = document.getElementById("product-details");
    details.innerHTML = `
    <h2>${product.name}</h2>
    <img class="product-image" src="${product.image}" alt="${product.name}" />
    <p>Categoria: ${product.category}</p>
    <p>Preço: R$ ${product.price.toFixed(2)}</p>
    <p>${product.description}</p>
    <button id="add-to-cart">Adicionar ao Carrinho</button>
  `;
    details.querySelector("#add-to-cart").addEventListener("click", () => {
      addToCart(product);
      modal.classList.add("hidden");
    });
    modal.classList.remove("hidden");
  }

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("product-modal").classList.add("hidden");
  });

  function applyFilters() {
    let filtered = [...products];
    const term = searchInput.value.toLowerCase();
    if (term) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(term));
    }
    const category = filterCategory.value;
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    const sort = sortSelect.value;
    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    displayProducts(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  filterCategory.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  displayProducts(products);
}

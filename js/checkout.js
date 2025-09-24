export function setupCheckout() {
  const checkoutBtn = document.getElementById("checkout-button");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckout = document.getElementById("close-checkout");
  const zipcodeInput = document.getElementById("zipcode");
  const msg = document.getElementById("zip-message");

  checkoutBtn.addEventListener("click", () => {
    checkoutModal.classList.remove("hidden");
    document.getElementById("cart-modal").classList.add("hidden");
  });
  closeCheckout.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
  });

  zipcodeInput.addEventListener("input", async () => {
    let zip = zipcodeInput.value.replace(/\D/g, "");
    if (zip.length === 8) {
      try {
        msg.textContent = "Fetching ZIP code...";
        const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (data.erro) {
          msg.textContent = "ZIP code not found. Please fill in manually.";
          return;
        }
        document.getElementById("street").value = data.logradouro;
        document.getElementById("neighborhood").value = data.bairro;
        document.getElementById("city").value = data.localidade;
        document.getElementById("state").value = data.uf;
        msg.textContent = "ZIP code found!";
        document.getElementById("number").focus();
      } catch (e) {
        msg.textContent = "Failed to fetch ZIP code. Please fill in manually.";
      }
    }
  });

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Purchase completed successfully!");
    localStorage.removeItem("cart");
    window.location.reload();
  });
}

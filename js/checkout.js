export function setupCheckout() {
  const checkoutBtn = document.getElementById("checkout-button");
  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckout = document.getElementById("close-checkout");
  const cepInput = document.getElementById("cep");
  const msg = document.getElementById("cep-message");

  checkoutBtn.addEventListener("click", () => {
    checkoutModal.classList.remove("hidden");
  });
  closeCheckout.addEventListener("click", () => {
    checkoutModal.classList.add("hidden");
  });

  cepInput.addEventListener("input", async () => {
    let cep = cepInput.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        msg.textContent = "Buscando CEP...";
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!res.ok) throw new Error("Erro de rede");
        const data = await res.json();
        if (data.erro) {
          msg.textContent = "CEP não encontrado. Preencha manualmente.";
          return;
        }
        document.getElementById("rua").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;
        msg.textContent = "CEP encontrado!";
        document.getElementById("numero").focus();
      } catch (e) {
        msg.textContent = "Falha ao buscar CEP. Preencha manualmente.";
      }
    }
  });

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Compra finalizada com sucesso!");
    checkoutModal.classList.add("hidden");
  });
}

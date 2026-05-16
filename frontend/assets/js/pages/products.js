const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  const brand = document.getElementById("brandFilter").value;
  const skin = document.getElementById("skinFilter").value;
  const params = new URLSearchParams();

  if (brand) params.set("brand", brand);
  if (skin) params.set("skin_type", skin);

  const products = await api.get(`/products?${params.toString()}`);
  productGrid.innerHTML = products.map((item) => new Product(item).render()).join("");

  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await api.post("/favorites", {
        entity_type: btn.dataset.type,
        entity_id: Number(btn.dataset.id)
      });
      btn.textContent = "Saved";
    });
  });
}

document.getElementById("applyFilters").addEventListener("click", loadProducts);
loadProducts().catch((error) => productGrid.innerHTML = `<p>${error.message}</p>`);

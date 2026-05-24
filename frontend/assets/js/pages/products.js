const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  const brand = document.getElementById("brandFilter").value;
  const skin = document.getElementById("skinFilter").value;
  const params = new URLSearchParams();

  if (brand) params.set("brand", brand);
  if (skin) params.set("skin_type", skin);

  const products = await api.get(`/products?${params.toString()}`);

  productGrid.innerHTML = products
    .map((item) => new Product(item).render())
    .join("");

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

loadProducts().catch((error) => {
  productGrid.innerHTML = `<p>${error.message}</p>`;
});


/* ======================================================
   EXTERNAL DISCOVERY - MAKEUP API
   ====================================================== */

const externalBrand = document.getElementById("externalBrand");
const externalType = document.getElementById("externalType");
const loadExternalProductsBtn = document.getElementById("loadExternalProducts");
const externalProductsGrid = document.getElementById("externalProductsGrid");

async function loadExternalProducts() {
  if (!externalProductsGrid) return;

  const brandFilter = externalBrand.value;
  const productType = externalType.value;

  const params = new URLSearchParams();

  if (brandFilter) params.append("brand", brandFilter);
  if (productType) params.append("product_type", productType);

  const query = params.toString() ? `?${params.toString()}` : "";

  externalProductsGrid.innerHTML = `<p class="muted">Loading external products...</p>`;

  try {
    const externalProducts = await api.get(`/external/makeup-products${query}`);

    if (!externalProducts.length) {
      externalProductsGrid.innerHTML = `<p class="muted">No external products found.</p>`;
      return;
    }

    externalProductsGrid.innerHTML = externalProducts.map(product => {
      const name = product.name || "External product";
      const brand = product.brand || "Unknown brand";
      const type = product.product_type || "";
      const imageUrl = product.image_url || "";
      const productLink = product.product_link || "";
      const price = product.price || "";

      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        `${brand} ${name} makeup product`
      )}`;

      return `
        <article class="card product-card external-product-card">
          ${
            imageUrl
              ? `
                <img 
                  class="card-img" 
                  src="${imageUrl}" 
                  alt="${name}" 
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <div class="external-image-fallback" style="display: none;">
                  <span>External Product</span>
                </div>
              `
              : `
                <div class="external-image-fallback">
                  <span>External Product</span>
                </div>
              `
          }

          <span class="tag">External API</span>

          <h3>${name}</h3>

          <p class="muted">
            ${brand}${type ? ` • ${type}` : ""}
          </p>

          ${price ? `<p><strong>$${price}</strong></p>` : ""}

          <div class="external-actions">
            ${
              productLink
                ? `
                  <a 
                    href="${productLink}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn secondary"
                  >
                    Buy product
                  </a>
                `
                : ""
            }

            <a 
              href="${searchUrl}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn primary"
            >
              Find product online
            </a>
          </div>
        </article>
      `;
    }).join("");
  } catch (error) {
    externalProductsGrid.innerHTML = `<p>${error.message}</p>`;
  }
}

if (loadExternalProductsBtn) {
  loadExternalProductsBtn.addEventListener("click", loadExternalProducts);
}
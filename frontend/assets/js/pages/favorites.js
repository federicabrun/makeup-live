const favoritesGrid = document.getElementById("favoritesGrid");

async function loadFavorites() {
  const favorites = await api.get("/favorites");
  if (!favorites.length) {
    favoritesGrid.innerHTML = "<p>No favorites yet.</p>";
    return;
  }

favoritesGrid.innerHTML = favorites.map(fav => {
  const typeLabel = fav.entity_type === "product" ? "Product" : "Tutorial";
  const name = fav.favorite_name || `${fav.entity_type} #${fav.entity_id}`;
  const subtitle = fav.subtitle ? `<p>${fav.subtitle}</p>` : "";

  const buyButton = fav.entity_type === "product" && fav.purchase_url
    ? `
      <a 
        href="${fav.purchase_url}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn primary buy-now-btn"
      >
        Buy now
      </a>
    `
    : "";

  return `
    <article class="card favorite-card">
      <span class="tag">${typeLabel}</span>
      <h3>${name}</h3>
      ${subtitle}

      <div class="favorite-actions">
        ${buyButton}
        <button class="btn secondary remove-fav" data-id="${fav.id}">
          Remove
        </button>
      </div>
    </article>
  `;
}).join("");

  document.querySelectorAll(".remove-fav").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await api.delete(`/favorites/${btn.dataset.id}`);
      loadFavorites();
    });
  });
}

loadFavorites().catch((error) => favoritesGrid.innerHTML = `<p>${error.message}</p>`);




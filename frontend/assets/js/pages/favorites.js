const favoritesGrid = document.getElementById("favoritesGrid");

function getActionLabel(fav) {
  if (fav.entity_type === "product") return "Buy now";
  if (fav.entity_type === "tutorial") return "Watch tutorial";
  return "Open";
}

async function loadFavorites() {
  const favorites = await api.get("/favorites");

  if (!favorites.length) {
    favoritesGrid.innerHTML = `
      <p class="muted">No favorites yet.</p>
    `;
    return;
  }

  favoritesGrid.innerHTML = favorites
    .map(fav => {
      const title = fav.favorite_name || `${fav.entity_type} #${fav.entity_id}`;
      const subtitle = fav.subtitle || "";
      const imageUrl = fav.image_url || "";
      const actionUrl = fav.action_url || "";

      return `
        <article class="card favorite-card">
          ${
            imageUrl
              ? `<img class="card-img" src="${imageUrl}" alt="${title}" />`
              : ""
          }

          <span class="tag">${fav.entity_type}</span>

          <h3>${title}</h3>

          ${subtitle ? `<p class="muted">${subtitle}</p>` : ""}

          <p class="muted">
            Saved on ${new Date(fav.created_at).toLocaleString()}
          </p>

          <div class="favorite-actions">
            ${
              actionUrl
                ? `<a class="btn primary" href="${actionUrl}" target="_blank" rel="noopener noreferrer">${getActionLabel(fav)}</a>`
                : ""
            }

            <button class="btn secondary remove-fav" data-id="${fav.id}">
              Remove
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".remove-fav").forEach(btn => {
    btn.addEventListener("click", async () => {
      await api.delete(`/favorites/${btn.dataset.id}`);
      loadFavorites();
    });
  });
}

loadFavorites().catch(error => {
  favoritesGrid.innerHTML = `<p>${error.message}</p>`;
});
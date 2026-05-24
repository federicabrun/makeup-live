class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.brand = data.brand;
    this.category = data.category;
    this.skinType = data.skinType || data.skin_type;
    this.price = data.price;
    this.imageUrl = data.imageUrl || data.image_url;
    this.description = data.description;
    this.purchaseUrl = data.purchaseUrl || data.purchase_url;
  }

  render() {
    const image = this.imageUrl || "https://placehold.co/400x300?text=Product";
    const price = Number(this.price || 0).toFixed(2);

    return `
      <article class="card product-card">
        <img src="${image}" alt="${this.name}" class="card-img">

        <h3>${this.name}</h3>

        <p>${this.brand || "No brand"} • ${this.category || "makeup"}</p>

        <p>${this.description || ""}</p>

        <strong>$${price}</strong>

        <div class="product-actions">
          <button 
            class="btn secondary favorite-btn" 
            data-type="product" 
            data-id="${this.id}"
          >
            Favorite
          </button>

          ${
            this.purchaseUrl
              ? `
                <a 
                  href="${this.purchaseUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn primary"
                >
                  Buy now
                </a>
              `
              : ""
          }

          <button 
            class="btn secondary comments-btn" 
            data-id="${this.id}"
          >
            Comments
          </button>
        </div>
      </article>
    `;
  }
}
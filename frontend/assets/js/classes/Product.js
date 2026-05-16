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
  }

  render() {
    return `
      <article class="card">
        <img src="${this.imageUrl || "https://placehold.co/400x300?text=Product"}" alt="${this.name}">
        <h3>${this.name}</h3>
        <p>${this.brand || "No brand"} • ${this.category || "makeup"}</p>
        <p>${this.description || ""}</p>
        <strong>$${Number(this.price || 0).toFixed(2)}</strong>
        <button class="btn secondary favorite-btn" data-type="product" data-id="${this.id}">Favorite</button>
      </article>
    `;
  }
}

class Product {
  constructor({ id, name, brand, category, skin_type, price, image_url, description, external_source, created_at }) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.category = category;
    this.skinType = skin_type;
    this.price = Number(price || 0);
    this.imageUrl = image_url;
    this.description = description;
    this.externalSource = external_source || "local";
    this.createdAt = created_at;
  }

  matchesSkinType(skinType) {
    return !skinType || this.skinType === skinType || this.skinType === "all";
  }
}

module.exports = Product;

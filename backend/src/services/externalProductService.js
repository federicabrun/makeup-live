async function getExternalProducts() {
  const endpoint = process.env.MAKEUP_API_URL || "http://makeup-api.herokuapp.com/api/v1/products.json";

  try {
    const response = await fetch(endpoint + "?brand=maybelline");
    if (!response.ok) throw new Error("Makeup API failed");

    const data = await response.json();
    return data.slice(0, 12).map((item) => ({
      name: item.name,
      brand: item.brand || "External Brand",
      category: item.product_type || "makeup",
      skin_type: "all",
      price: Number(item.price || 0),
      image_url: item.image_link || "https://placehold.co/400x300?text=Makeup",
      description: item.description || "External product from Makeup API",
      external_source: "Makeup API"
    }));
  } catch (error) {
    return [
      {
        name: "Mock Glow Foundation",
        brand: "Makeup Live",
        category: "foundation",
        skin_type: "dry",
        price: 24.99,
        image_url: "https://placehold.co/400x300?text=Foundation",
        description: "Fallback product used when external API is unavailable.",
        external_source: "mock"
      },
      {
        name: "Mock Matte Lipstick",
        brand: "Makeup Live",
        category: "lipstick",
        skin_type: "all",
        price: 14.5,
        image_url: "https://placehold.co/400x300?text=Lipstick",
        description: "Fallback lipstick product.",
        external_source: "mock"
      }
    ];
  }
}

module.exports = { getExternalProducts };

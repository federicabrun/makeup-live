async function getExternalMakeupProducts(req, res, next) {
  try {
    const { brand, product_type } = req.query;

    const params = new URLSearchParams();

    if (brand) params.append("brand", brand);
    if (product_type) params.append("product_type", product_type);

    const baseUrl =
      process.env.MAKEUP_API_URL ||
      "http://makeup-api.herokuapp.com/api/v1/products.json";

    const url = params.toString()
      ? `${baseUrl}?${params.toString()}`
      : baseUrl;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        message: "External Makeup API request failed"
      });
    }

    const data = await response.json();

    const products = data.slice(0, 12).map(product => ({
      external_id: product.id,
      name: product.name,
      brand: product.brand,
      product_type: product.product_type,
      category: product.category,
      price: product.price,
      currency: product.currency,
      image_url: product.image_link,
      product_link: product.product_link,
      description: product.description
    }));

    res.json(products);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExternalMakeupProducts
};
import apiClient from "../axios.js";

class ProductService {
  async createProduct(productData) {
    const { data } = await apiClient.post("/product", productData);
    return data;
  }

  async getProductById(id) {
    const { data } = await apiClient.get(`/product/${id}`);
    return data;
  }

  async getProducts(page, categories) {
    let queryString = `?page=${page}`;
    if (categories && categories.length > 0) {
      queryString += `&categories=${categories.join(",")}`;
    }
    const { data } = await apiClient.get(`/product${queryString}`);
    return data;
  }

  async deleteProduct(id) {
    const { data } = await apiClient.delete(`/product/${id}`);
    return data;
  }

  async getUserProducts () {
    const response = await apiClient.get("/user/products");
    return response.data;
  }
}

export default new ProductService();

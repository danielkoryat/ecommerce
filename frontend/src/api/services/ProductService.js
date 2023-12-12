import apiClient from "../axios.js"

class ProductService {

    async createProduct(productData) {
        const { data } = await apiClient.post("/product", productData); 
        return data;
    }

    async getProductById(id) {
        const { data } = await apiClient.get(`/product/${id}`);
        return data;
    }

    async getProducts(page) {
        const { data } = await apiClient.get("/product?page="+page);
        return data;
    }
}

export default new ProductService();
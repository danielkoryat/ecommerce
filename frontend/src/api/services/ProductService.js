import apiClient from "../axios.js"

class ProductService {

    async createProduct(productData) {
        const { data } = await apiClient.post("/product", productData); 
        return data;
    }
}

export default new ProductService();
import apiClient from "../axios";

class CategoryService {

    async getCategories() {
        const { data } = await apiClient.get("/category");
        return data;
    }
}

export default new CategoryService();
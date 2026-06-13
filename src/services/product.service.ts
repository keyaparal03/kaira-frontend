import { apiClient } from "../api/apiClient";

class ProductService {
  /*
  |--------------------------------------------------------------------------
  | Get All Products
  |--------------------------------------------------------------------------
  */

  async getProducts() {
    try {
      const response =
        await apiClient.get(
          "/products"
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Get Single Product
  |--------------------------------------------------------------------------
  */

  async getProduct(
    id: string
  ) {
    try {
      const response =
        await apiClient.get(
          `/products/${id}`
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Search Products
  |--------------------------------------------------------------------------
  */

  async searchProducts(
    keyword: string
  ) {
    try {
      const response =
        await apiClient.get(
          `/products/search/${keyword}`
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Get Products By Category
  |--------------------------------------------------------------------------
  */

  async getCategoryProducts(
    categoryId: string
  ) {
    try {
      const response =
        await apiClient.get(
          `/products/category/${categoryId}`
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Create Product (Admin)
  |--------------------------------------------------------------------------
  */

  async createProduct(
    data: any
  ) {
    try {
      const response =
        await apiClient.post(
          "/products",
          data
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Product (Admin)
  |--------------------------------------------------------------------------
  */

  async updateProduct(
    id: string,
    data: any
  ) {
    try {
      const response =
        await apiClient.put(
          `/products/${id}`,
          data
        );

      return response;
    } catch (error) {
      throw error;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete Product (Admin)
  |--------------------------------------------------------------------------
  */

  async deleteProduct(
    id: string
  ) {
    try {
      const response =
        await apiClient.delete(
          `/products/${id}`
        );

      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
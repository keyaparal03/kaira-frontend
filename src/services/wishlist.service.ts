import { apiClient } from "../api/ApiClient";

class WishlistService {

  async getWishlist() {
    return await apiClient.get(
      "/wishlist"
    );
  }

  async addToWishlist(
    productId: string
  ) {
    return await apiClient.post(
      "/wishlist",
      { productId }
    );
  }

  async removeWishlist(
    productId: string
  ) {
    return await apiClient.delete(
      `/wishlist/${productId}`
    );
  }
}

export default
  new WishlistService();
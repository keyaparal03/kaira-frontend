import { apiClient }
from "../api/ApiClient";

class CartService {

  /*
  GET CART
  */

  async getCart() {

    return await apiClient.get(
      "/cart"
    );
  }

  /*
  ADD TO CART
  */

  async addToCart(
    productId: string,
    quantity: number
  ) {

    return await apiClient.post(
      "/cart",
      {
        productId,
        quantity
      }
    );
  }

  /*
  UPDATE QUANTITY
  */

  async updateCartItem(
    cartItemId: string,
    quantity: number
  ) {

    return await apiClient.put(
      `/cart/${cartItemId}`,
      {
        quantity
      }
    );
  }

  /*
  REMOVE
  */

  async removeCartItem(
    cartItemId: string
  ) {

    return await apiClient.delete(
      `/cart/${cartItemId}`
    );
  }
}

export default
  new CartService();
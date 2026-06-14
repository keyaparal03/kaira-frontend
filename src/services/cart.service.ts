import { apiClient } from "../api/apiClient";

class CartService {

  getCart() {
    return apiClient.get(
      "/cart"
    );
  }

  addToCart(
    productId:string,
    quantity:number
  ) {
    return apiClient.post(
      "/cart",
      {
        productId,
        quantity
      }
    );
  }

  updateCart(
    id:string,
    quantity:number
  ) {
    return apiClient.put(
      `/cart/${id}`,
      { quantity }
    );
  }

  removeCart(
    id:string
  ) {
    return apiClient.delete(
      `/cart/${id}`
    );
  }
}

export default
  new CartService();
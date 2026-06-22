import { apiClient }
from "../api/ApiClient";

class OrderService {

  async createOrder(
    data: any
  ) {
    return await apiClient.post(
      "/orders",
      data
    );
  }

  async getMyOrders() {
    return await apiClient.get(
      "/orders/my-orders"
    );
  }

  async getOrderById(
    id: string
  ) {
    return await apiClient.get(
      `/orders/${id}`
    );
  }
  /*
  FETCH ORDERS
  */

  async fetchOrders() {

    return apiClient.get(
      "/orders/my-orders"
    );
  }
}

export default
  new OrderService();
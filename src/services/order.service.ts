import { apiClient }
from "../api/apiClient";

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
}

export default
  new OrderService();
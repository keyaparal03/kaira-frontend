import { apiClient }
from "../api/apiClient";

class PaymentService {

  /*
  CREATE PAYMENT ORDER
  */

  async createPaymentOrder(
    amount: number
  ) {

    return await apiClient.post(

      "/payment/create-order",

      {
        amount
      }

    );
  }

  /*
  VERIFY PAYMENT
  */

  async verifyPayment(
    data: any
  ) {

    return await apiClient.post(

      "/payment/verify",

      data

    );
  }
}

export default
new PaymentService();
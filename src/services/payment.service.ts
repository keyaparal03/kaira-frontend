import { apiClient }
from "../api/apiClient";

class PaymentService {

  /*
  CREATE PAYMENT ORDER
  */

  async createPaymentOrder(
    amount: number
  ) {
    try {

      const response =
        await apiClient.post<
          any,
          { amount:number }
        >(

          "/payment/create-order",

          {
            amount
          }

        );

      console.log(
        "SERVICE PAYMENT RESPONSE =",
        response
      );

      /*
      apiClient already returns JSON
      */

      return response;

    } catch (error) {

      console.log(
        "SERVICE ERROR =",
        error
      );

      throw error;
    }
  }

  /*
  VERIFY PAYMENT
  */

  async verifyPayment(
    data: any
  ) {
    try {

      const response =
        await apiClient.post<
          any,
          any
        >(

          "/payment/verify",

          data

        );

      return response;

    } catch (error) {

      console.log(
        "VERIFY ERROR =",
        error
      );

      throw error;
    }
  }
}

export default
new PaymentService();
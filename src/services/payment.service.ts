import {
  apiClient
} from "../api/ApiClient";

/*
-----------------------------------
CREATE PAYMENT ORDER
-----------------------------------
*/

interface CreatePaymentPayload {
  amount: number;
}

/*
-----------------------------------
VERIFY PAYMENT
-----------------------------------
*/

interface VerifyPaymentPayload {

  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;

  /*
  MongoDB Order ID
  */

  orderId: string;
}

class PaymentService {

  /*
  -----------------------------------
  CREATE RAZORPAY ORDER
  -----------------------------------
  */

  async createPaymentOrder(
    amount: number
  ) {

    try {

      const response =
        await apiClient.post<
          any,
          CreatePaymentPayload
        >(

          "/payment/create-order",

          {
            amount
          }
        );

      console.log(
        "CREATE PAYMENT RESPONSE =",
        response
      );

      return response;

    } catch (
      error: any
    ) {

      console.log(
        "CREATE PAYMENT ERROR =",
        error
      );

      throw error;
    }
  }

  /*
  -----------------------------------
  VERIFY PAYMENT
  -----------------------------------
  */

  async verifyPayment(
    data: VerifyPaymentPayload
  ) {

    try {

      const response =
        await apiClient.post<
          any,
          VerifyPaymentPayload
        >(

          "/payment/verify",

          {
            razorpay_order_id:
              data.razorpay_order_id,

            razorpay_payment_id:
              data.razorpay_payment_id,

            razorpay_signature:
              data.razorpay_signature,

            /*
            IMPORTANT
            PASS ORDER ID
            */

            orderId:
              data.orderId
          }
        );

      console.log(
        "VERIFY PAYMENT RESPONSE =",
        response
      );

      return response;

    } catch (
      error: any
    ) {

      console.log(
        "VERIFY PAYMENT ERROR =",
        error
      );

      throw error;
    }
  }
}

export default
new PaymentService();
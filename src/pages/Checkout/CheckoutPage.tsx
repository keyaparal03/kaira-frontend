import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PaymentService from "../../services/payment.service";
import { createOrder } from "../../redux/features/orderThunk";
import { fetchCart } from "../../redux/features/cartThunk";

import "./CheckoutPage.scss";

interface CheckoutForm {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const { cartItems } = useSelector(
    (state: any) => state.cart
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<CheckoutForm>({
    mode: "onChange"
  });

  /*
  TOTAL
  */

  const total = cartItems.reduce(
    (acc: number, item: any) =>
      acc +
      (item.product?.price || 0) *
      item.quantity,
    0
  );

  /*
  CARD FORMAT
  */

  const handleCardNumber = (e: any) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .substring(0, 16);

    let formatted =
      value.match(/.{1,4}/g)?.join(" ") || "";

    setValue("cardNumber", formatted, {
      shouldValidate: true
    });

    clearErrors("cardNumber");
  };

  /*
  EXPIRY FORMAT
  */

  const handleExpiry = (e: any) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .substring(0, 4);

    if (value.length > 2) {
      value =
        value.slice(0, 2) +
        "/" +
        value.slice(2);
    }

    setValue("expiry", value, {
      shouldValidate: true
    });

    clearErrors("expiry");
  };

  /*
  CVV FORMAT
  */

  const handleCvv = (e: any) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .substring(0, 3);

    setValue("cvv", value, {
      shouldValidate: true
    });

    clearErrors("cvv");
  };

  /*
  ZIP FORMAT
  */

  const handleZip = (e: any) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .substring(0, 6);

    setValue("zip", value, {
      shouldValidate: true
    });

    clearErrors("zip");
  };

  /*
  SUBMIT
  */

const onSubmit = async (
  data: CheckoutForm
) => {
  try {

    /*
    CREATE PAYMENT ORDER
    */

    const payment: any =
      await PaymentService
      .createPaymentOrder(
        total
      );

    /*
    DEBUG RESPONSE
    */

    // console.log(
    //   "RAW PAYMENT RESPONSE =",
    //   payment
    // );

    // alert(
    //   JSON.stringify(
    //     payment
    //   )
    // );

    /*
    TEMPORARY
    FORCE RESPONSE
    */

    const paymentData =
      payment;

    console.log(
      "PAYMENT DATA =",
      paymentData
    );

    /*
    RAZORPAY OPTIONS
    */

    const options = {

      key:
        paymentData.key,

      amount:
        paymentData.order?.amount,

      currency:
        "INR",

      name:
        "KAIRA Store",

      description:
        "Product Payment",

      order_id:
        paymentData.order?.id,

      handler: async (
        response: any
      ) => {

        try {

          console.log(
            "PAYMENT SUCCESS =",
            response
          );

          /*
          VERIFY PAYMENT
          */

          await PaymentService
          .verifyPayment(
            response
          );

          /*
          SAVE ORDER
          */

          await dispatch(
            createOrder({

              shippingAddress:
                data.address,

              city:
                data.city,

              state:
                data.state,

              postalCode:
                data.zip,

              paymentMethod:
                "Razorpay"

            })
          ).unwrap();

          /*
          REFRESH CART
          */

          await dispatch(
            fetchCart()
          );

          toast.success(
            "Payment Successful"
          );

          navigate(
            "/order-success"
          );

        } catch (error) {

          console.log(
            "ORDER SAVE ERROR =",
            error
          );

          toast.error(
            "Order creation failed"
          );
        }
      },

      modal: {

        ondismiss:
        function () {

          toast.error(
            "Payment Cancelled"
          );
        }
      },

      theme: {

        color:
        "#f5b301"
      }
    };

    /*
    OPEN RAZORPAY
    */

    const razorpay =

      new (window as any)
      .Razorpay(
        options
      );

    razorpay.open();

  } catch (error) {

    console.log(
      "PAYMENT ERROR =",
      error
    );

    toast.error(
      "Payment Failed"
    );
  }
};

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        <form
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <h2>Billing Address</h2>

          <input
            placeholder="Full Name"
            {...register("name", {
              required: "Name required"
            })}
          />
          {errors.name && (
            <p className="error">
              {errors.name.message}
            </p>
          )}

          <input
            placeholder="Street Address"
            {...register("address", {
              required: "Address required"
            })}
          />
          {errors.address && (
            <p className="error">
              {errors.address.message}
            </p>
          )}

          <input
            placeholder="City"
            {...register("city", {
              required: "City required"
            })}
          />
          {errors.city && (
            <p className="error">
              {errors.city.message}
            </p>
          )}

          <input
            placeholder="State"
            {...register("state", {
              required: "State required"
            })}
          />
          {errors.state && (
            <p className="error">
              {errors.state.message}
            </p>
          )}

          <input
            placeholder="Zip Code"
            {...register("zip", {
              required: "Zip required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Must be 6 digits"
              }
            })}
            onChange={handleZip}
          />
          {errors.zip && (
            <p className="error">
              {errors.zip.message}
            </p>
          )}

          <h2>Payment Details</h2>

          <input
            placeholder="Cardholder Name"
            {...register("cardName", {
              required: "Cardholder required"
            })}
          />
          {errors.cardName && (
            <p className="error">
              {errors.cardName.message}
            </p>
          )}

          <input
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", {
              required:
                "Card Number required",
              validate: (value) => {
                const raw =
                  value.replace(/\s/g, "");

                return (
                  raw.length === 16 ||
                  "Must be 16 digits"
                );
              }
            })}
            onChange={handleCardNumber}
          />
          {errors.cardNumber && (
            <p className="error">
              {errors.cardNumber.message}
            </p>
          )}

          <div className="row">

            <div>
              <input
                placeholder="MM/YY"
                {...register("expiry", {
                  required:
                    "Expiry required",
                  pattern: {
                    value:
                      /^(0[1-9]|1[0-2])\/\d{2}$/,

                    message:
                      "Invalid MM/YY"
                  }
                })}
                onChange={handleExpiry}
              />

              {errors.expiry && (
                <p className="error">
                  {errors.expiry.message}
                </p>
              )}
            </div>

            <div>
              <input
                placeholder="CVV"
                {...register("cvv", {
                  required:
                    "CVV required",
                  pattern: {
                    value:
                      /^[0-9]{3}$/,

                    message:
                      "Must be 3 digits"
                  }
                })}
                onChange={handleCvv}
              />

              {errors.cvv && (
                <p className="error">
                  {errors.cvv.message}
                </p>
              )}
            </div>

          </div>

          <button
            className="pay-btn"
            type="submit"
          >
            Pay ₹{total}
          </button>

        </form>

        {/* SUMMARY */}

        <div className="summary">

          <h2>Order Summary</h2>

          {cartItems.map(
            (item: any) => (
              <div
                key={item._id}
                className="summary-item"
              >
                <span>
                  {item.product?.name}
                </span>

                <span>
                  Qty: {item.quantity}
                </span>
              </div>
            )
          )}

          <div className="total-box">
            <h3>
              Total: ₹{total}
            </h3>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
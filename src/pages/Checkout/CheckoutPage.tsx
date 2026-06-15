import React from "react";

import {
  useForm
} from "react-hook-form";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

import PaymentService
from "../../services/payment.service";

import {
  createOrder
} from "../../redux/features/orderThunk";

import {
  fetchCart
} from "../../redux/features/cartThunk";

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

  const navigate =
    useNavigate();

  const dispatch:any =
    useDispatch();

  const {
    cartItems
  } = useSelector(
    (state:any)=>
      state.cart
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState:{
      errors
    }
  } = useForm<CheckoutForm>({
    mode:"onChange"
  });

  /*
  TOTAL
  */

  const total =
    cartItems.reduce(
      (
        acc:number,
        item:any
      )=>

        acc +

        (
          item.product?.price || 0
        ) *

        item.quantity,

      0
    );

  /*
  FORMATTERS
  */

  const handleCardNumber =
  (e:any)=>{

    let value =
      e.target.value
      .replace(/\D/g,"")
      .substring(0,16);

    let formatted =
      value.match(/.{1,4}/g)
      ?.join(" ")
      || "";

    setValue(
      "cardNumber",
      formatted,
      {
        shouldValidate:true
      }
    );

    clearErrors(
      "cardNumber"
    );
  };

  const handleExpiry =
  (e:any)=>{

    let value =
      e.target.value
      .replace(/\D/g,"")
      .substring(0,4);

    if(
      value.length > 2
    ){

      value =
        value.slice(0,2)
        + "/"
        + value.slice(2);
    }

    setValue(
      "expiry",
      value,
      {
        shouldValidate:true
      }
    );

    clearErrors(
      "expiry"
    );
  };

  const handleCvv =
  (e:any)=>{

    let value =
      e.target.value
      .replace(/\D/g,"")
      .substring(0,3);

    setValue(
      "cvv",
      value,
      {
        shouldValidate:true
      }
    );

    clearErrors(
      "cvv"
    );
  };

  const handleZip =
  (e:any)=>{

    let value =
      e.target.value
      .replace(/\D/g,"")
      .substring(0,6);

    setValue(
      "zip",
      value,
      {
        shouldValidate:true
      }
    );

    clearErrors(
      "zip"
    );
  };

  /*
  PAYMENT + ORDER
  */

  const onSubmit =
  async(
    data:CheckoutForm
  )=>{

    try{

      /*
      CREATE PAYMENT ORDER
      */

      const payment:any =

      await PaymentService
      .createPaymentOrder(
        total
      );

      const options = {

        key:
        "rzp_test_xxxxxxxxx",   // replace

        amount:
        payment.order.amount,

        currency:
        "INR",

        name:
        "KAIRA Store",

        description:
        "Order Payment",

        order_id:
        payment.order.id,

        handler:
        async(
          response:any
        )=>{

          /*
          VERIFY PAYMENT
          */

          await PaymentService
          .verifyPayment(
            response
          );

          /*
          CREATE ORDER DB
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
            "Payment Success"
          );

          navigate(
            "/order-success"
          );
        }
      };

      const razorpay =

      new (window as any)
      .Razorpay(
        options
      );

      razorpay.open();

    }catch(error){

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
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }
        >

          <h2>
            Billing Address
          </h2>

          <input
            placeholder="Full Name"
            {...register(
              "name",
              {
                required:
                "Name required"
              }
            )}
          />

          {
            errors.name &&
            <p className="error">
              {
                errors.name.message
              }
            </p>
          }

          <input
            placeholder="Street Address"
            {...register(
              "address",
              {
                required:
                "Address required"
              }
            )}
          />

          <input
            placeholder="City"
            {...register(
              "city",
              {
                required:
                "City required"
              }
            )}
          />

          <input
            placeholder="State"
            {...register(
              "state",
              {
                required:
                "State required"
              }
            )}
          />

          <input
            placeholder="Zip Code"
            {...register(
              "zip",
              {
                required:
                "Zip required"
              }
            )}
            onChange={
              handleZip
            }
          />

          <h2>
            Payment Details
          </h2>

          <input
            placeholder="Cardholder Name"
            {...register(
              "cardName",
              {
                required:
                "Required"
              }
            )}
          />

          <input
            placeholder="Card Number"
            {...register(
              "cardNumber",
              {
                required:
                "Required"
              }
            )}
            onChange={
              handleCardNumber
            }
          />

          <div className="row">

            <input
              placeholder="MM/YY"
              {...register(
                "expiry",
                {
                  required:
                  "Required"
                }
              )}
              onChange={
                handleExpiry
              }
            />

            <input
              placeholder="CVV"
              {...register(
                "cvv",
                {
                  required:
                  "Required"
                }
              )}
              onChange={
                handleCvv
              }
            />

          </div>

          <button
            className="pay-btn"
            type="submit"
          >
            Pay ₹{total}
          </button>

        </form>

        <div className="summary">

          <h2>
            Order Summary
          </h2>

          {
            cartItems.map(
              (item:any)=>(

                <div
                  key={item._id}
                  className="summary-item"
                >

                  <span>
                    {
                      item.product?.name
                    }
                  </span>

                  <span>
                    Qty:
                    {
                      item.quantity
                    }
                  </span>

                </div>
              )
            )
          }

          <div className="total-box">

            <h3>
              Total:
              ₹{total}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;
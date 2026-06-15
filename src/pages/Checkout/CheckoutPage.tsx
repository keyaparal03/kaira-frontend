import React from "react";

import {
  useForm
} from "react-hook-form";

import {
  useSelector
} from "react-redux";

import {
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

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

  const {
    cartItems
  } = useSelector(
    (state: any) =>
      state.cart
  );

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: {
      errors
    }
  } =
    useForm<CheckoutForm>({
      mode: "onChange"
    });

  /*
  TOTAL
  */

  const total =
    cartItems.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        (
          item.product?.price || 0
        ) *
        item.quantity,
      0
    );

  /*
  CARD FORMAT
  */

  const handleCardNumber =
    (e: any) => {

      let value =
        e.target.value
          .replace(
            /\D/g,
            ""
          )
          .substring(
            0,
            16
          );

      let formatted =
        value.match(
          /.{1,4}/g
        )?.join(" ")
        || "";

      setValue(
        "cardNumber",
        formatted,
        {
          shouldValidate: true
        }
      );

      clearErrors(
        "cardNumber"
      );
    };

  /*
  EXPIRY FORMAT
  */

  const handleExpiry =
    (e: any) => {

      let value =
        e.target.value
          .replace(
            /\D/g,
            ""
          )
          .substring(
            0,
            4
          );

      if (
        value.length > 2
      ) {
        value =
          value.slice(
            0,
            2
          ) +
          "/" +
          value.slice(
            2
          );
      }

      setValue(
        "expiry",
        value,
        {
          shouldValidate: true
        }
      );

      clearErrors(
        "expiry"
      );
    };

  /*
  CVV
  */

  const handleCvv =
    (e: any) => {

      let value =
        e.target.value
          .replace(
            /\D/g,
            ""
          )
          .substring(
            0,
            3
          );

      setValue(
        "cvv",
        value,
        {
          shouldValidate: true
        }
      );

      clearErrors(
        "cvv"
      );
    };

  /*
  ZIP
  */

  const handleZip =
    (e: any) => {

      let value =
        e.target.value
          .replace(
            /\D/g,
            ""
          )
          .substring(
            0,
            6
          );

      setValue(
        "zip",
        value,
        {
          shouldValidate: true
        }
      );

      clearErrors(
        "zip"
      );
    };

  /*
  SUBMIT
  */

  const onSubmit =
    (
      data:
      CheckoutForm
    ) => {

      console.log(
        data
      );

      toast.success(
        "Payment Successful"
      );

      navigate(
        "/order-success"
      );
    };

  /*
  REGISTER HELPERS
  */

  const zipRegister =
    register(
      "zip",
      {
        required:
          "Zip required",

        pattern: {
          value:
            /^[0-9]{6}$/,

          message:
            "Must be 6 digits"
        }
      }
    );

  const cardRegister =
    register(
      "cardNumber",
      {
        required:
          "Card number required",

        validate:
          (value) => {

            const raw =
              value.replace(
                /\s/g,
                ""
              );

            return (
              raw.length === 16 ||

              "Must be 16 digits"
            );
          }
      }
    );

  const expiryRegister =
    register(
      "expiry",
      {
        required:
          "Expiry required",

        pattern: {
          value:
            /^(0[1-9]|1[0-2])\/\d{2}$/,

          message:
            "Invalid MM/YY"
        }
      }
    );

  const cvvRegister =
    register(
      "cvv",
      {
        required:
          "CVV required",

        pattern: {
          value:
            /^[0-9]{3}$/,

          message:
            "3 digits only"
        }
      }
    );

  return (

    <div className="checkout-page">

      <div className="checkout-wrapper">

        {/* FORM */}

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

          {
            errors.address &&
            <p className="error">
              {
                errors.address.message
              }
            </p>
          }

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

          {
            errors.city &&
            <p className="error">
              {
                errors.city.message
              }
            </p>
          }

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

          {
            errors.state &&
            <p className="error">
              {
                errors.state.message
              }
            </p>
          }

          {/* ZIP */}

          <input
            placeholder="Zip Code"

            {...zipRegister}

            onChange={
              (e) => {
                zipRegister.onChange(
                  e
                );
                handleZip(
                  e
                );
              }
            }
          />

          {
            errors.zip &&
            <p className="error">
              {
                errors.zip.message
              }
            </p>
          }

          <h2>
            Payment Details
          </h2>

          <input
            placeholder="Cardholder Name"

            {...register(
              "cardName",
              {
                required:
                  "Cardholder required"
              }
            )}
          />

          {
            errors.cardName &&
            <p className="error">
              {
                errors.cardName.message
              }
            </p>
          }

          {/* CARD */}

          <input
            placeholder="Card Number"

            {...cardRegister}

            onChange={
              (e) => {
                cardRegister.onChange(
                  e
                );
                handleCardNumber(
                  e
                );
              }
            }
          />

          {
            errors.cardNumber &&
            <p className="error">
              {
                errors.cardNumber.message
              }
            </p>
          }

          <div className="row">

            {/* EXPIRY */}

            <div>

              <input
                placeholder="MM/YY"

                {...expiryRegister}

                onChange={
                  (e) => {
                    expiryRegister.onChange(
                      e
                    );
                    handleExpiry(
                      e
                    );
                  }
                }
              />

              {
                errors.expiry &&
                <p className="error">
                  {
                    errors.expiry.message
                  }
                </p>
              }

            </div>

            {/* CVV */}

            <div>

              <input
                placeholder="CVV"

                {...cvvRegister}

                onChange={
                  (e) => {
                    cvvRegister.onChange(
                      e
                    );
                    handleCvv(
                      e
                    );
                  }
                }
              />

              {
                errors.cvv &&
                <p className="error">
                  {
                    errors.cvv.message
                  }
                </p>
              }

            </div>

          </div>

          <button
            className="pay-btn"
            type="submit"
          >
            Pay Now
          </button>

        </form>

        {/* SUMMARY */}

        <div className="summary">

          <h2>
            Order Summary
          </h2>

          {
            cartItems.map(
              (item: any) => (

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
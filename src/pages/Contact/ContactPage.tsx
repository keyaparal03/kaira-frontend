import React, {
  useState
} from "react";

import ContactService
from "../../services/contact.service";

import {
  toast
} from "react-toastify";

import "./ContactPage.scss";

function ContactPage() {

  const [
    form,
    setForm
  ] = useState({

    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange =
    (e: any) => {

      setForm({

        ...form,

        [e.target.name]:
        e.target.value
      });
    };

  const handleSubmit =
    async (
      e: any
    ) => {

      e.preventDefault();

      try {

        await ContactService
        .sendMessage(
          form
        );

        toast.success(
          "Message Sent"
        );

        setForm({

          name: "",
          email: "",
          phone: "",
          message: ""
        });

      } catch {

        toast.error(
          "Failed to send"
        );
      }
    };

  return (

    <div className="contact-page">

      {/* HERO */}

      <div className="contact-banner">

        <h1>
          Contact Us
        </h1>

        <p>
          We would love to hear from you
        </p>

      </div>

      <div className="contact-wrapper">

        {/* LEFT */}

        <div className="contact-info">

          <h2>
            Get In Touch
          </h2>

          <p>
            📍 Address: 13, Bholanath Nandi Ln, Belepole, Shibpur, Howrah, West Bengal 711104
          </p>

          <p>
            📞 +91 9992199939
          </p>

          <p>
            ✉ support@kaira.com
          </p>

          <p>
            Luxury handmade jewelry,
            women fashion and accessories.
          </p>

        </div>

        {/* RIGHT */}

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={
              handleChange
            }
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={
              handleChange
            }
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={
              handleChange
            }
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={
              handleChange
            }
          />

          <button>
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default ContactPage;
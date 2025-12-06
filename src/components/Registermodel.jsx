import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import countryTelephoneData from "country-telephone-data";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51S6Az0JVOD7CLiJZVCkueWzATwbjdnLAari5c1r29CaWVlxQDcs5qJAU904WHxvV8sxvpBs3wtQTPtvX2TWZXixA00XrFFkeKS"); // ⚡ Your publishable key

const RegisterModal = ({ isOpen, onClose }) => {
  // Set default country code to United States
  const defaultCountry = countryTelephoneData.allCountries.find(c => c.iso2 === "us");
  const [countryCode, setCountryCode] = useState(defaultCountry ? `+${defaultCountry.dialCode}` : "+1");
  const [paymentTag, setPayNow] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    joiningAs: [],
    message: "",
  });

  // 👉 Price state
  const [price, setPrice] = useState("");

  // 👉 Role prices
  const rolePrices = {
    Student: "Free",
    Faculty: "$100",
    Industry: "$300",
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (role) => {
    setForm((prev) => {
      if (prev.joiningAs.includes(role)) {
        return { ...prev, joiningAs: prev.joiningAs.filter((r) => r !== role) };
      } else {
        return { ...prev, joiningAs: [...prev.joiningAs, role] };
      }
    });
  };

  // 👉 Handle select dropdown change
  const handleSelectChange = (e) => {
    const selectedRole = e.target.value;
    setForm({ ...form, joiningAs: [selectedRole] });
    setPrice(rolePrices[selectedRole] || "");
    if(selectedRole!=="" ){
      setPayNow(true);
    } else {
      setPayNow(false);
    }
  };



  // 👉 Define role prices in INR (commented out - Stripe payment disabled)
// const rolePricesINR = {
//   Student: 0,        // Free
//   Faculty: 100,    // ₹100 = 100 * 100
//   Industry: 300,   // ₹500 = 500 * 100
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Form Data:", { ...form, countryCode, phoneNumber });

  let selectedType = form.joiningAs.join(", ") || "-";
  // const amount = rolePricesINR[selectedType] ?? 0;

  // 👉 Free registration check (commented out - Stripe payment disabled)
  // if (amount === 0) {
  //   localStorage.setItem(
  //     "registrationForm",
  //     JSON.stringify({
  //       ...form,
  //       countryCode,
  //       phoneNumber,
  //       selectedType,
  //       mail_type: "payment_success",
  //     })
  //   );
  //   window.location.href = window.location.origin + `/success?type=${selectedType}`;
  //   return;
  // }

  // 👉 Save form for later use
  localStorage.setItem(
    "registrationForm",
    JSON.stringify({
      ...form,
      countryCode,
      phoneNumber,
      selectedType,
      mail_type: "payment_success",
    })
  );

  // Redirect to success page (Stripe payment flow disabled)
  window.location.href = window.location.origin + `/success?type=${selectedType}`;

  // STRIPE PAYMENT CODE - COMMENTED OUT
  // try {
  //   // 👉 Call backend to create session
  //   const res = await fetch("/api/create-checkout-session", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       amount,        // in ₹ (backend multiplies by 100)
  //       email: form.email,
  //       type: selectedType,
  //     }),
  //   });

  //   let data = null;
  //   try {
  //     data = await res.json(); // 👈 parse safely
  //   } catch (err) {
  //     console.error("Response is not JSON:", err);
  //   }

  //   if (!res.ok) {
  //     console.error("Backend error:", data.error || data);
  //     alert("Failed to create payment session. Try again.");
  //     return;
  //   }

  //   const stripe = await stripePromise;
  //   const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

  //   if (error) {
  //     console.error("Stripe Checkout Error:", error);
  //     alert("Redirect to payment failed. Try again.");
  //   }
  // } catch (err) {
  //   console.error("Unexpected error:", err);
  //   alert("Something went wrong. Please try again.");
  // }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch("http://localhost:8000/api/contactus", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ...form,
  //         countryCode,
  //         phoneNumber,
  //       }),
  //     });

  //     let result;
  //     try {
  //       result = await res.json();
  //     } catch {
  //       result = { success: false, message: "Server returned non-JSON response" };
  //     }

  //     if (result.success) {
  //       alert("Form submitted successfully!");
  //       setForm({ name: "", email: "", joiningAs: [], message: "" });
  //       setPhoneNumber("");
  //       setCountryCode("+1");
  //     } else {
  //       alert("Failed to submit. Try again.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error submitting form.");
  //   }
  // };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0   backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 sm:p-8 z-10">
      <button
  className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
  onClick={onClose}
>
  <FaTimes size={18} />
</button>


        <h2 className="text-3xl font-bold  mb-6 text-[#0065FF]">
          Join us at the event
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-[#001629] font-normal mb-1">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-[#001629] font-normal   mb-1">Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#001629] font-normal   mb-1">Phone number</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-[120px]"
              >
                {/* Force United States as first */}
                <option value="+1">United States (+1)</option>
                {countryTelephoneData.allCountries.map((country) => (
                  <option
                    key={country.iso2}
                    value={`+${country.dialCode}`}
                    selected={country.iso2 === "us"}
                  >
                    {country.name} (+{country.dialCode})
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Joining as */}
          <div>
            <label className="block text-[#001629] font-normal   mb-2">Joining us as</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  onChange={handleSelectChange}
                  value={form.joiningAs[0] || ""}
                >
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Industry">Industry & Government</option>
                </select>
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  value={price ? `${price}` : ""}
                  readOnly
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100"
                />
              </div>
            </div>
            {/* <div className="flex flex-wrap gap-6 mt-2">
              {["Attendee", "Exhibitor", "Media"].map((role) => (
                <label key={role} className="flex items-center gap-2 text-[#001629] font-normal">
                  <input
                    type="checkbox"
                    checked={form.joiningAs.includes(role)}
                    onChange={() => handleCheckbox(role)}
                  />
                  {role}
                </label>
              ))}
            </div> */}
          </div>

          {/* Message */}
          <div>
            <label className="block text-[#001629] font-normal   mb-2">Message</label>
            <textarea
              rows="3"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter your Message for the team"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            ></textarea>
          </div>

          {/* Submit */}
          {paymentTag && (<button
            type="submit"
            className="w-full bg-[#49B104] text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Pay Now
          </button>)}
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;

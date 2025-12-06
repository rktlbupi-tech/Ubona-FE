"use client";
import React, { useState } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaChevronDown, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import Dots from "../../../public/assets/images/Dots.webp";
import { getCodeList } from "country-list";
import Swal from "sweetalert2";


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    country: "India",
    phone: "",
    email: "",
    message: "",
  });

  const [countryCode, setCountryCode] = useState("INDIA");


  const countries = getCodeList();
  const countryArray = Object.entries(countries).sort((a, b) => {
    if (a[1] === "India") return -1;
    if (b[1] === "India") return 1;
    return a[1].localeCompare(b[1]);
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      name: e.target[0].value,
      country: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value,
      message: e.target[4].value,
    };

    console.log("Sending form data:", formDataToSend);

    try {
      const res = await fetch("http://localhost:3011/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      const data = await res.json();
      console.log(" Response:", data);

      if (res.ok && data.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent!",
          html: `<p style="font-size: 0.85rem;">Our team will contact you in a short time.</p>`,
          showConfirmButton: false,
          width: 400,
          showCloseButton: true,
          closeButtonHtml: "&times;",
          customClass: {
            popup: "rounded-xl shadow-lg",
            title: "text-green-600 text-lg",
            content: "text-gray-800",
            closeButton: "text-gray-600 hover:text-gray-800",
          },
          timer: 10000,
          timerProgressBar: true,
        });
        setFormData({
          name: "",
          country: "INDIA",
          phone: "",
          email: "",
          message: "",
        });

        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to send",
          text: "Please try again later.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "Please check your connection or try again later.",
        showConfirmButton: true,
      });
    }
  };



  return (
    <div>
      {/* --- Contact Info Header --- */}
      <div className="relative w-full bg-[#1976D2] text-center pt-10 md:pt-18 pb-10 px-6 overflow-hidden rounded-3xl mb-0 md:mb-12 mt-18">
        <div className="absolute top-20 opacity-60 left-0 w-full h-auto pointer-events-none">
          <img src={Dots} alt="banner-img" className="w-full object-contain" />
        </div>

        <h2 className="text-3xl md:text-5xl text-[#DBF262] mb-10 relative z-10 font-semibold">
          Get In Touch With Us
        </h2>

        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-8 md:mt-20 md:mb-0 md:gap-12 w-full px-4 md:px-8 relative z-10 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#3A8DE0] p-3 rounded-md shadow-md">
              <MdEmail size={22} className="text-yellow-400" />
            </div>
            <a
              href="mailto:sales@ubona.com"
              className="font-medium text-sm md:text-base hover:underline"
            >
              sales@ubona.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#3A8DE0] p-3 rounded-md shadow-md">
              <MdPhone size={22} className="text-yellow-400" />
            </div>
            <a
              href="tel:+919035063802"
              className="font-medium text-sm md:text-base hover:underline"
            >
              +91 9035063802
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#3A8DE0] p-3 rounded-md shadow-md">
              <FaLinkedin size={22} className="text-yellow-400" />
            </div>
            <a
              href="https://linkedin.com/company/ubona/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm md:text-base hover:underline"
            >
              linkedin.com/company/ubona/
            </a>
          </div>
        </div>
      </div>

      {/* --- Contact Form --- */}
      <section className="w-full bg-none md:bg-[#011937] text-white py-14 px-2 md:px-12 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#00162C_0%,#1269CD_100%)] opacity-[0.6]" />

        <div className="relative max-w-8xl mx-auto flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="w-full md:w-2/4 rounded-2xl p-5 md:p-8 shadow-[0_0_25px_rgba(0,0,0,0.3)] bg-[linear-gradient(180deg,#00162C_0%,#1269CD_100%)] opacity-[0.8]">
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              Please fill out the form below and we'll get back to you.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full pl-4 py-3 rounded-lg bg-[#08254e] border border-[#FFFFFF33] 
                 text-white placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>

              {/* Country + Phone + Email */}
              <div className="flex flex-col md:flex-row gap-3">

                {/* Country Dropdown */}
                <div className="relative w-full md:w-1/6">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#08254e] border border-[#FFFFFF33] 
                   text-white py-3 pl-4 pr-10 rounded-lg focus:outline-none"
                  >
                    {countryArray.map(([code, name]) => (
                      <option key={code} value={code} className="text-black bg-[#fff]">
                        {name}
                      </option>
                    ))}
                  </select>

                  {/* Custom arrow */}
                    <FaChevronDown className="absolute right-3 top-6 -translate-y-1/2 pointer-events-none text-white" />
                </div>

                {/* Phone Field */}
                <div className="relative w-full md:w-1/3">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full pl-4 py-3 rounded-lg bg-[#08254e] border border-[#FFFFFF33] 
                   text-white placeholder-gray-400 focus:outline-none"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="relative w-full md:w-2/4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your work email"
                    className="w-full pl-4 py-3 rounded-lg bg-[#08254e] border border-[#FFFFFF33] 
                   text-white placeholder-gray-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="How can we assist you"
                className="w-full rounded-lg bg-[#08254e] border border-[#FFFFFF33] 
               text-white placeholder-gray-400 p-4 focus:outline-none"
                required
              ></textarea>

              {/* Submit Button */}
             <button
  type="submit"
  className="w-full py-3 mt-3 md:mt-8 bg-[#FFBF3C] text-[#2D2D2D] font-semibold 
  rounded-full shadow-md transition-all duration-300 transform
  hover:-translate-y-1 hover:shadow-xl hover:text-white cursor-pointer"
>
  Submit
</button>

            </form>

            <p className="text-xs text-gray-400 mt-5 leading-relaxed text-center md:text-center">
              We will only use your personal information as outlined in our{" "}
              <a href="#" className="text-yellow-400 hover:underline">
                Privacy Policy
              </a>
              . You can manage or withdraw your consent at any time by sending us
              an email at{" "}
              <a
                href="mailto:network@ubona.com"
                className="text-yellow-400 hover:underline"
              >
                network@ubona.com
              </a>
              .
            </p>
          </div>

          <div className="w-full md:w-2/4 flex flex-col md:items-end gap-4">
            <div className="flex items-start gap-3 text-left md:text-right">

              <div className="ms-3 md:ms-0">
                <h3 className="font-semibold text-white">
                  Ubona Technologies Pvt. Ltd.
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  #442, 1st Floor & 3rd Floor, 17th Cross, Sector 4,
                  <br />
                  HSR Layout, Bengaluru – 560102, India.
                </p>
              </div>
              <div className="flex justify-end md:bg-none bg-[#FFFFFF33] md:p-2 p-4 rounded-lg">
                <FaMapMarkerAlt className="text-yellow-400 text-1xl mt-1" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg md:w-[500px] h-[490px] border border-[#123d6d]/40">
              <iframe
                title="Ubona Technologies Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.715288519274!2d77.64131457599603!3d12.91183298739405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae149f2c5b5f5d%3A0x2d1b7c7412c0e4f4!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka%20560102!5e0!3m2!1sen!2sin!4v1710864000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;

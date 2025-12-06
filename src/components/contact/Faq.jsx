import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const categories = ["All", "Ubona", "Genie", "Connect", "Speech", "Others"];


const faqsData = {
  All: [
    { category: "Ubona", question: "How long does it take to implement HALO solutions?", answer: "Implementation time depends on scale and customization, but typically ranges between 2 to 6 weeks. Our deployment team ensures smooth integration with your existing infrastructure — including CRM, telephony, and data systems.", },
    { category: "Ubona", question: "What is Ubona and what does it do?", answer: "Ubona provides advanced AI-driven communication and automation solutions to enhance customer engagement and operational efficiency.", },
    { category: "Ubona", question: "Which industries does Ubona serve?", answer: "Ubona serves telecom, BFSI, healthcare, retail, and other customer-centric industries requiring intelligent automation.", },
    { category: "Ubona", question: "How can I request a demo or consultation?", answer: "You can request a demo or consultation through our website’s contact form or email us directly.", },
    { category: "Ubona", question: "What makes HALO different from other AI solutions?", answer: "HALO stands out due to its seamless integration capabilities, custom AI modules, and superior voice recognition technology.", },
  ],
  Ubona: [
    {
      category: "Ubona",
      question: "How long does it take to implement HALO solutions?",
      answer:
        "Implementation time depends on scale and customization, but typically ranges between 2 to 6 weeks. Our deployment team ensures smooth integration with your existing infrastructure — including CRM, telephony, and data systems.",
    },
    {
      category: "Ubona",
      question: "What is Ubona and what does it do?",
      answer:
        "Ubona provides advanced AI-driven communication and automation solutions to enhance customer engagement and operational efficiency.",
    },
    {
      category: "Ubona",
      question: "Which industries does Ubona serve?",
      answer:
        "Ubona serves telecom, BFSI, healthcare, retail, and other customer-centric industries requiring intelligent automation.",
    },
    {
      category: "Ubona",
      question: "How can I request a demo or consultation?",
      answer:
        "You can request a demo or consultation through our website’s contact form or email us directly.",
    },
    {
      category: "Ubona",
      question: "What makes HALO different from other AI solutions?",
      answer:
        "HALO stands out due to its seamless integration capabilities, custom AI modules, and superior voice recognition technology.",
    },
  ],

  Genie: [
    {
      category: "Genie",
      question: "What is Genie used for?",
      answer:
        "Genie is an AI-powered virtual assistant designed to automate routine customer support and back-office operations efficiently.",
    },
    {
      category: "Genie",
      question: "Can Genie integrate with CRM tools?",
      answer:
        "Yes, Genie seamlessly integrates with leading CRM platforms to provide unified communication and data management.",
    },
    {
      category: "Genie",
      question: "Is Genie customizable?",
      answer:
        "Absolutely! Genie can be tailored to your company’s workflows, tone, and brand voice for a personalized experience.",
    },
  ],

  Connect: [
    {
      category: "Connect",
      question: "What is Ubona Connect?",
      answer:
        "Ubona Connect is a communication bridge that enhances customer interaction across multiple channels like voice, chat, and email.",
    },
    {
      category: "Connect",
      question: "Does Connect support analytics?",
      answer:
        "Yes, Ubona Connect provides detailed analytics and insights on customer interactions for better decision-making.",
    },
  ],

  Speech: [
    {
      category: "Speech",
      question: "What is Ubona Speech?",
      answer:
        "Ubona Speech offers AI-driven speech recognition and synthesis tools for automating voice interactions and analysis.",
    },
    {
      category: "Speech",
      question: "Is Ubona Speech multilingual?",
      answer:
        "Yes, Ubona Speech supports multiple Indian and international languages for accurate voice processing.",
    },
  ],

  Others: [
    {
      category: "Others",
      question: "How can I contact customer support?",
      answer:
        "You can contact our support team anytime via email or through the Contact Us section on our website.",
    },
    {
      category: "Others",
      question: "Does Ubona offer cloud deployment?",
      answer:
        "Yes, Ubona solutions are available in both on-premise and cloud deployment options.",
    },
  ],
};

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);


  const filteredFaqs =
    activeCategory === "All"
      ? Object.values(faqsData).flat()
      : faqsData[activeCategory] || [];

  return (
    <div id="faq" className="min-h-screen flex flex-col rounded-3xl items-center justify-center text-white md:px-6 px-2 pt-16 pb-10 mt-3 md:mt-15"
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 22, 44, 0.60) 28.51%, rgba(98, 70, 236, 0.60) 100%)",
      }}
    >

      <div className="w-full max-w-4xl rounded-3xl md:p-10 md:pb-0 p-2 ">
        <div className="flex justify-center items-center mb-8.5 gap-6">
          <div className="h-[2px] w-14 md:w-28 bg-linear-to-r from-[#434343] to-[#E1DD68]"></div>
          <p className="text-sm text-[#DA7C29] font-medium tracking-wider">
            Frequently Asked Questions
          </p>
          <div className="h-[2px] w-14 md:w-28 bg-linear-to-r from-[#E1DD68] to-[#434343]"></div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center rounded-full border border-[#3B436E] overflow-hidden px-2 py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#C7D4FF] text-[#0A0F2C]"
                  : "text-gray-300 hover:text-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`shadow-[inset_0_2px_10px_rgba(151,158,243,0.1)] rounded-2xl border border-[#909291]/24 overflow-hidden transition-all duration-500 ${isOpen ? "bg-[#979EF3]/10" : "bg-[#979EF3]/10"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex justify-between items-center cursor-pointer px-6 py-5 text-left text-base md:text-lg font-medium hover:text-[#FFBF3C] transition-all duration-500 ease-in-out outline-0 ${isOpen ? "text-[#FFBF3C]" : "text-white"
                    }`}
                >
                  {faq.question}
                  <span className="text-sm">
                    {isOpen ? 
                      <span className="transition-all duration-500 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#FAD892" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      : 
                      <span className="transition-all duration-500 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#C3C3C3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    }
                  </span>
                </button>
                <div
                  className={`
                    transition-all duration-500 ease-in-out
                    overflow-hidden
                    px-6
                    ${isOpen ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0 pb-0"}
                  `}
                >
                  <div className="text-sm text-white leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-18 text-sm text-[#C3C3C3]">
          <p>Have another question? Please contact our team!</p>
          <p className="mt-2 text-[#C3C3C3]">
            In case of any compliance issues please write to us at –{" "}
            <a href="mailto:info@ubona.com" className="text-[#C3C3C3]">
              info@ubona.com
            </a>{" "}
            or{" "}
            <a href="mailto:dpo@ubona.com" className="text-[#C3C3C3]">
              dpo@ubona.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;

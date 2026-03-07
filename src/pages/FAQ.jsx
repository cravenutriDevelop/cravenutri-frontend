import React, { useState } from "react";
import Title from "../components/Title";

const faqs = [
  {
    question: "Are CraveNutri products 100% natural?",
    answer:
      "Yes. Our products are made using natural ingredients and are free from harmful additives.",
  },
  {
    question: "Do your products contain soy protein?",
    answer:
      "No. CraveNutri products are completely free from soy protein and protein powders.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders usually arrive within 3–7 business days depending on your location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email or SMS.",
  },
  {
    question: "Can I request a refund?",
    answer:
      "Yes. If you receive a damaged or incorrect product, you can request a refund within 24 hours of delivery.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FFFBF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Heading */}
        <div className="flex justify-center mb-12">
          <Title text1={"Frequently"} text2={"Asked Questions"} />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >

              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>

                <span className="text-xl text-gray-500">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

        {/* Bottom Contact */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          Still have questions? Contact us at{" "}
          <span className="font-medium text-gray-800">
            official@cravenutri.com
          </span>
        </div>

      </div>
    </div>
  );
};

export default FAQ;
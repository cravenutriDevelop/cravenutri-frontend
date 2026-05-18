import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Building } from "lucide-react";
import Title from "../components/Title";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const Contact = () => {
  return (
  <>
<SEO
  title="Contact CraveNutri | Customer Support & Help"
  description="Get in touch with CraveNutri for support, product queries, partnerships, or customer assistance."
  url="https://cravenutri.com/contact"
  image="https://cravenutri.com/cravenutriicon.png"
/>
<BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          { name: "About", url: "https://cravenutri.com/contact" }
        ]}
      />

    <div className="min-h-screen bg-[#FFFBF7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Title text1={"CONTACT"} text2={"US"} />
          <p className="text-gray-500 mt-3">
            We would love to hear from you. Reach out to us anytime.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">
            Contact Information
          </h2>

          <div className="space-y-5 text-gray-700">

            <div className="flex items-start gap-3">
              <Building className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Trade Name:</span> CurveNutri
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Building className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Company:</span>{" "}
                CURVENUTRI HEALTH PRIVATE LIMITED
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Phone:</span> +91-123456789
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:help@cravenutri.com"
                  className="text-orange-600 hover:underline"
                >
                  help@cravenutri.com
                </a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Registered Address:</span>{" "}
                123, Health Street, sector18, Noida , Uttar Pradesh , 123456
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-gray-500 mt-1" size={18} />
              <p>
                <span className="font-semibold">Fulfilment Address:</span>{" "}
                123, Health Street, sector18, Noida , Uttar Pradesh , 123456
              </p>
            </div>

          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-400 text-center mt-8"
        >
          For any inquiries, please contact us using the details above.
        </motion.p>
      </div>
    </div>
      </>
  );
};

export default Contact;
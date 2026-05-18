import { motion } from "framer-motion";
import Title from "../components/Title";
import { Users, Package, Target } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const About = () => {
  return (
    <>
      <SEO
        title="About CraveNutri | Healthy Nutrition Brand"
        description="Learn about CraveNutri, our mission, healthy nutrition products, and commitment to wellness and quality."
        url="https://cravenutri.com/about"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://cravenutri.com/" },
          { name: "About", url: "https://cravenutri.com/about" }
        ]}
      />
      <div className="bg-[#FFFBF7] min-h-screen overflow-hidden py-16 px-6 md:px-12">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Title text1={"ABOUT"} text2={"CRAVENUTRI"} />
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Building a healthier future through premium nutrition, trusted
            products, and a strong commitment to wellness.
          </p>
        </motion.div>

        {/* ================= COMPANY SECTION ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-10 mb-12 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Company
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            <b className="text-gray-900">CraveNutri</b> is a modern nutrition
            brand dedicated to providing high-quality health and wellness
            products. Our goal is to make clean, effective nutrition accessible
            to everyone who wants to live a healthier lifestyle.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            We carefully select products that combine scientific research,
            premium ingredients, and great taste. Whether you are an athlete,
            fitness enthusiast, or simply someone who values better nutrition,
            CraveNutri aims to support your journey toward a stronger and
            healthier life.
          </p>
        </motion.div>

        {/* ================= PRODUCTS SECTION ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-10 mb-12 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Products
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            At CraveNutri, we focus on providing a wide range of nutrition and
            wellness products designed to fuel your body and support your
            performance.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-[#FFFBF7] p-6 rounded-xl border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Protein Supplements
              </h3>
              <p className="text-gray-600 text-sm">
                High-quality protein powders and supplements to support muscle
                recovery and strength.
              </p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-xl border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Healthy Snacks
              </h3>
              <p className="text-gray-600 text-sm">
                Protein bars, cookies, and other nutritious snacks designed for
                convenient healthy eating.
              </p>
            </div>

            <div className="bg-[#FFFBF7] p-6 rounded-xl border">
              <h3 className="font-semibold text-gray-800 mb-2">
                Wellness Essentials
              </h3>
              <p className="text-gray-600 text-sm">
                Supplements and daily nutrition products to support overall
                health and well-being.
              </p>
            </div>

          </div>
        </motion.div>

        {/* ================= TEAM SECTION ================= */}
        {/* ================= TEAM SECTION ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Team
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Our team is made up of passionate individuals who believe in the
            power of nutrition and healthy living. From product researchers to
            customer support specialists, every member of CraveNutri works with
            one goal — delivering quality, transparency, and trust to our
            customers.
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            We continuously research the latest developments in nutrition and
            wellness to bring you products that truly make a difference in your
            daily life.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-8">
            <Link
              to="/team"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Meet Our Team
            </Link>
          </div>
        </motion.div>

      </div>
    </>
  );
};

export default About;
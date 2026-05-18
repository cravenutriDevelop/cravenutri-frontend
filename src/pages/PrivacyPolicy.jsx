import Title from "../components/Title";
import SEO from "../components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | CraveNutri"
        description="Read CraveNutri's privacy policy to understand how we collect, use, and protect your information."
        url="https://cravenutri.com/privacy-policy"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Heading */}
          <div className="flex justify-center mb-12">
              <h1 className="sr-only">Privacy Policy – CraveNutri</h1>
            <Title text1={"Privacy"} text2={"Policy"} />
          </div>

          {/* Intro */}
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            At CraveNutri, your privacy is extremely important to us. This policy
            explains how we collect, use, and protect your personal information
            when you use our website or purchase our products.
          </p>

          {/* Sections */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Information Collection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Information We Collect
              </h3>
              <p className="text-gray-600">
                We collect basic personal details such as your name, email,
                contact number, and shipping address when you place an order or
                contact us.
              </p>
            </div>

            {/* Use of Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                How We Use Your Information
              </h3>
              <p className="text-gray-600">
                Your information is used only to process orders, improve our
                services, and communicate important updates related to your
                purchases.
              </p>
            </div>

            {/* Data Protection */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Data Protection
              </h3>
              <p className="text-gray-600">
                We use secure technologies and payment gateways to ensure that
                your personal and payment information remains protected.
              </p>
            </div>

            {/* Third Party Sharing */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Third-Party Sharing
              </h3>
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information to third
                parties. Your data is only shared with trusted partners required
                for order delivery and payment processing.
              </p>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            If you have any questions about this Privacy Policy, please contact us
            at{" "}
            <span className="text-gray-800 font-medium">
              official@cravenutri.com
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
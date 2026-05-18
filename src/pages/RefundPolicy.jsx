import Title from "../components/Title";
import SEO from "../components/SEO";

const RefundPolicy = () => {
  return (
    <>
      <SEO
        title="Refund Policy | CraveNutri"
        description="Read CraveNutri's refund and return policy for orders, cancellations, and replacements."
        url="https://cravenutri.com/refund-policy"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Heading */}
          <div className="flex justify-center mb-12">
            <Title text1={"Refund"} text2={"Policy"} />
          </div>

          {/* Intro */}
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            At CraveNutri, customer satisfaction is our priority. If you receive a
            damaged or incorrect product, we are here to help. Please review our
            refund policy below.
          </p>

          {/* Sections */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Eligibility */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Refund Eligibility
              </h3>
              <p className="text-gray-600">
                Refunds are available only for products that are damaged,
                defective, or incorrectly delivered.
              </p>
            </div>

            {/* Report Time */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Reporting an Issue
              </h3>
              <p className="text-gray-600">
                Any issue must be reported within <b>24 hours</b> of delivery with
                proper proof such as images of the product.
              </p>
            </div>

            {/* Refund Process */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Refund Processing
              </h3>
              <p className="text-gray-600">
                Once the request is verified, refunds will be processed within
                <b> 2–3 working days</b> to the original payment method.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Need Help?
              </h3>
              <p className="text-gray-600">
                For any refund related queries, please contact us at{" "}
                <span className="font-medium text-gray-800">
                  official@cravenutri.com
                </span>.
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
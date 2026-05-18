import Title from "../components/Title";
import SEO from "../components/SEO";
import BreadcrumbSchema from "../components/BreadcrumbSchema";

const ShippingPolicy = () => {
  return (
    <>
<SEO
  title="Shipping Policy | CraveNutri"
  description="Learn about CraveNutri shipping timelines, delivery process, and order tracking information."
  url="https://cravenutri.com/shipping-policy"
  image="https://cravenutri.com/cravenutriicon.png"
/>
<BreadcrumbSchema
  items={[
    { name: "Home", url: "https://cravenutri.com/" },
    { name: "Shipping Policy", url: "https://cravenutri.com/shipping-policy" }
  ]}
/>
   
    <div className="bg-[#FFFBF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Heading */}
        <div className="flex justify-center mb-12">
          <h1 className="sr-only">Shipping Policy – CraveNutri</h1>
          <Title text1={"Shipping"} text2={"Policy"} />
        </div>

        {/* Intro */}
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          At CraveNutri, we ensure your healthy snacks reach you quickly and
          safely. Below are the details about our shipping process and delivery
          timelines.
        </p>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Processing Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Order Processing
            </h3>
            <p className="text-gray-600">
              All orders are processed within <b>24–48 hours</b> after successful
              payment confirmation. Orders placed on weekends or public holidays
              will be processed on the next working day.
            </p>
          </div>

          {/* Delivery Time */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Delivery Time
            </h3>
            <p className="text-gray-600">
              Delivery usually takes <b>3–7 business days</b> depending on your
              location across India.
            </p>
          </div>

          {/* Shipping Charges */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Shipping Charges
            </h3>
            <p className="text-gray-600">
              Shipping charges may vary depending on your location and order
              value. Any applicable shipping fee will be shown at checkout
              before completing your order.
            </p>
          </div>

          {/* Tracking */}
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Order Tracking
            </h3>
            <p className="text-gray-600">
              Once your order is shipped, you will receive a tracking link via
              email or SMS so you can monitor your delivery status in real-time.
            </p>
          </div>

        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          If you have any questions regarding shipping, please contact us at{" "}
          <span className="text-gray-700 font-medium">
            official@cravenutri.com
          </span>
        </div>

      </div>
    </div>
     </>
  );
};

export default ShippingPolicy;
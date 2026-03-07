import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CraveNutriInfo = () => {

  useEffect(() => {
    document.title = "CraveNutri | High Protein Nutrition Made Simple";
  }, []);

  return (
    <div className="bg-[#FFFBF7] text-gray-800">

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          High-Protein Nutrition <br /> Made for Real Life
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          CraveNutri creates convenient high-protein nutrition products
          designed for busy lifestyles. Whether you're heading to work,
          finishing a workout, or rushing out the door, staying nourished
          should be simple and fast.
        </p>
      </section>

      {/* Tagline Section */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-2xl font-semibold mb-4">
            Fuel Your Day Without Slowing Down
          </h2>

          <p className="text-gray-600 text-lg">
            No complicated preparation. No wasted time.
          </p>

          <p className="text-gray-600 text-lg mt-2">
            Just simple, high-protein nutrition designed to keep up with
            your daily routine.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for Busy Schedules
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Quick Preparation
            </h3>
            <p className="text-gray-600">
              Our products are designed to be fast and easy to prepare,
              helping you save time every morning.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              High Protein
            </h3>
            <p className="text-gray-600">
              Packed with quality protein to support your energy,
              fitness goals, and daily nutrition.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">
              Great Taste
            </h3>
            <p className="text-gray-600">
              Healthy nutrition should never be boring. Our products
              are made to be both nutritious and delicious.
            </p>
          </div>

        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-6">
            Made for Everyday Life
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            CraveNutri fits seamlessly into your daily routine —
            whether you're commuting, working, studying, or
            finishing a workout.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-gray-700 text-lg">
            <span>🚗 Commuting</span>
            <span>💻 Working</span>
            <span>🏋️ Fitness</span>
            <span>📚 Studying</span>
            <span>✈️ Traveling</span>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-6">
          Simple. Nutritious. Delicious.
        </h2>

        <p className="text-gray-600 text-lg mb-8">
          With CraveNutri, healthy eating becomes effortless.
          Spend less time worrying about meals and more time
          focusing on what matters most.
        </p>

        <Link
          to="/collection"
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition inline-block"
        >
          Explore Products
        </Link>

      </section>

    </div>
  );
};

export default CraveNutriInfo;
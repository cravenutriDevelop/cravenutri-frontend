import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import OTPLogin from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Verify from "./pages/Verify";
import TermsOfService from "./pages/TermsOfService";
import Team from "./pages/Team";
import GuestRoute from "./components/GuestRoute";
import FAQ from "./pages/FAQ";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

const App = () => {
  return (
    <div className="bg-[#FFFBF7] ">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/collection" element={<Collection />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/team" element={<Team />} />


  <Route path="/terms-of-service" element={<TermsOfService />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/refund-policy" element={<RefundPolicy />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/shipping-policy" element={<ShippingPolicy
   />} />

  <Route path="/product/:productId" element={<Product />} />
  <Route path="/cart" element={<Cart />} />

  <Route
    path="/login"
    element={
      <GuestRoute>
        <OTPLogin />
      </GuestRoute>
    }
  />

  <Route path="/place-order" element={<PlaceOrder />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/verify" element={<Verify />} />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

      <Footer />
    </div>
  );
};

export default App;

import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";
import { Helmet } from "react-helmet-async";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OTPLogin = () => {
  const { backendUrl, setToken, navigate } = useContext(ShopContext);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobile) return toast.error("Enter mobile number");

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/send-otp`, { mobile });
      if (response.data.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, { mobile, otp });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFBF7]">

        {/* Centered content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center w-full sm:max-w-md m-auto mt-24 px-6"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Login / Sign Up</h2>

          {!otpSent ? (
            <motion.form
              onSubmit={handleSendOtp}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col w-full gap-4 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              onSubmit={handleVerifyOtp}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col w-full gap-4 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <p
                className="text-sm text-blue-600 hover:underline cursor-pointer mt-2 text-center"
                onClick={() => setOtpSent(false)}
              >
                Edit Mobile Number
              </p>
            </motion.form>
          )}
        </motion.div>

        {/* Footer */}

      </div>
    </>
  );
};

export default OTPLogin;
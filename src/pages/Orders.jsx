import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import {
  ShoppingBagIcon,
  CubeIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/solid";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCancel = async () => {
    try {
      setCancelling(true);
      const res = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId: cancelOrderId },
        { headers: { token } }
      );
      if (res.data.success) {
        await loadOrderData();
        setTrackingOrder(null);
        setCancelOrderId(null);
      } else {
        alert(res.data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error cancelling order");
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-emerald-800 bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-emerald-500";
      case "shipped":
        return "text-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500";
      case "packed":
        return "text-purple-800 bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-500";
      case "placed":
        return "text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500";
      case "cancelled":
        return "text-rose-800 bg-gradient-to-r from-rose-50 to-red-50 border-l-4 border-rose-500";
      default:
        return "text-gray-800 bg-gradient-to-r from-gray-50 to-stone-50 border-l-4 border-gray-400";
    }
  };

  const steps = [
    { key: "placed", label: "Order Placed", icon: ShoppingBagIcon },
    { key: "packed", label: "Packed", icon: CubeIcon },
    { key: "shipped", label: "Shipped", icon: TruckIcon },
    { key: "delivered", label: "Delivered", icon: CheckCircleIcon },
  ];

  const getCurrentStepIndex = (status) => {
    if (status === "cancelled") return -1;
    return steps.findIndex((s) => s.key === status);
  };

  const closeModal = () => {
    setTrackingOrder(null);
    setCancelOrderId(null); // also close any open confirmation
  };

  if (loading) {
    return (
      <div className="border-t pt-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-2xl mb-8">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30 animate-pulse"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200/50">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="h-4 w-20 bg-gray-200/70 rounded"></div>
                        <div className="h-4 w-24 bg-gray-300/70 rounded mt-2"></div>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-gray-200/50"></div>
                      <div>
                        <div className="h-4 w-16 bg-gray-200/70 rounded"></div>
                        <div className="h-4 w-20 bg-gray-300/70 rounded mt-2"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-20 bg-gray-200/70 rounded-full"></div>
                      <div className="h-8 w-24 bg-gray-200/70 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gray-200/70 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 w-3/4 bg-gray-300/70 rounded"></div>
                        <div className="flex gap-2 mt-2">
                          <div className="h-4 w-12 bg-gray-200/70 rounded"></div>
                          <div className="h-4 w-12 bg-gray-200/70 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="My Orders | CraveNutri"
        description="View your order history, track shipments, and manage returns for CraveNutri products."
        url="https://cravenutri.com/orders"
        image="https://cravenutri.com/orders-og-image.jpg"
        noindex={true}
      />
      {/* <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet> */}

      <div className="border-t pt-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
        <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .order-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.2), 0 10px 10px -5px rgba(79, 70, 229, 0.1);
        }
      `}</style>

        <div className="max-w-5xl mx-auto">
          <div className="text-2xl mb-8 animate-fadeInUp">
            <Title text1={"MY"} text2={"ORDERS"} />
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl animate-fadeInUp border border-white/30">
              <ShoppingBagIcon className="w-20 h-20 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No orders yet</p>
              <p className="text-sm text-gray-400 mt-1">
                When you place an order, it will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="order-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Order Header */}
                  <div
                    className="p-4 sm:p-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50"
                    onClick={() => setTrackingOrder(order)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Order ID
                          </p>
                          <p className="font-mono text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            #{order._id.slice(-8)}
                          </p>
                        </div>
                        <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Placed on
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1.5 rounded-r-lg text-xs font-semibold ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus.toUpperCase()}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrackingOrder(order);
                          }}
                          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 hover:scale-105 active:scale-95 border border-indigo-200/50"
                        >
                          <span role="img" aria-label="map">
                            📍
                          </span>
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 group/item transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 p-2 rounded-lg"
                      >
                        <Link
                          to={`/product/${item.product?._id}`}
                          className="block w-16 h-16 overflow-hidden rounded-lg border border-gray-200/70"
                        >
                          <img
                            src={item.product?.images?.[0]?.url || "/placeholder.png"}
                            alt={item.product?.name}
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.product?._id}`}
                            className="font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                          >
                            {item.product?.name}
                          </Link>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {currency}
                              {item.price}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>Qty: {item.quantity}</span>
                            {item.size && (
                              <>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>Size: {item.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {currency}
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-pink-50/30 border-t border-gray-200/50 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Payment:</span>
                      <span className="font-medium capitalize text-gray-700">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${order.paymentStatus === "paid"
                          ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                          : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                          }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Total:</span>
                      <span className="ml-2 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {currency}
                        {Number(order.totalAmount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Track Order Modal */}
          {trackingOrder && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeInUp"
              onClick={closeModal}
            >
              <div
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn border border-white/40"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200/70 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Track Order #{trackingOrder._id.slice(-8)}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 hover:rotate-90"
                  >
                    <XCircleIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="p-6">
                  {/* Timeline */}
                  {trackingOrder.orderStatus === "cancelled" ? (
                    <div className="space-y-6">
                      {steps.slice(0, 2).map((step, index) => (
                        <div key={step.key} className="flex items-start gap-3 group">
                          <div className="relative flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <CheckCircleSolid className="w-5 h-5 text-white" />
                            </div>
                            {index < steps.length - 1 && (
                              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-300 to-green-300 mt-1"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <p className="font-medium text-gray-800">{step.label}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(trackingOrder.updatedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <XCircleIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Cancelled</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(trackingOrder.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {steps.map((step, index) => {
                        const currentIndex = getCurrentStepIndex(trackingOrder.orderStatus);
                        const isCompleted = index <= currentIndex;
                        const isCurrent = index === currentIndex;

                        return (
                          <div key={step.key} className="flex items-start gap-3 group">
                            <div className="relative flex flex-col items-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isCompleted
                                  ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white group-hover:scale-110"
                                  : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500"
                                  }`}
                              >
                                {isCompleted ? (
                                  <CheckCircleSolid className="w-5 h-5" />
                                ) : (
                                  <step.icon className="w-5 h-5" />
                                )}
                              </div>
                              {index < steps.length - 1 && (
                                <div
                                  className={`w-0.5 h-8 mt-1 transition-all duration-500 ${index < currentIndex
                                    ? "bg-gradient-to-b from-emerald-300 to-green-300"
                                    : "bg-gradient-to-b from-gray-200 to-gray-300"
                                    }`}
                                ></div>
                              )}
                            </div>
                            <div className="flex-1 pb-6">
                              <p
                                className={`font-medium transition-colors ${isCompleted ? "text-gray-800" : "text-gray-400"
                                  }`}
                              >
                                {step.label}
                                {isCurrent && (
                                  <span className="ml-2 text-xs font-normal text-indigo-600 animate-pulse">
                                    (Current)
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="mt-8 pt-6 border-t border-gray-200/70">
                    <h4 className="font-semibold text-gray-700 mb-3">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          #{trackingOrder._id.slice(-8)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Placed on</span>
                        <span className="text-gray-700">{formatDate(trackingOrder.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Amount</span>
                        <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {currency}
                          {Number(trackingOrder.totalAmount).toFixed(2)}
                          {/* {trackingOrder.totalAmount} */}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment</span>
                        <span className="capitalize text-gray-700">{trackingOrder.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Cancel Order button – shown for placed/packed orders */}
                    {["placed", "packed"].includes(trackingOrder.orderStatus) && (
                      <button
                        onClick={() => setCancelOrderId(trackingOrder._id)}
                        className="mt-6 w-full py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Confirmation Modal */}
          {cancelOrderId && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeInUp"
              onClick={() => setCancelOrderId(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scaleIn border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cancel Order</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to cancel this order? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCancelOrderId(null)}
                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all duration-200"
                    disabled={cancelling}
                  >
                    No, Keep
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
                    disabled={cancelling}
                  >
                    {cancelling ? "Cancelling..." : "Yes, Cancel"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
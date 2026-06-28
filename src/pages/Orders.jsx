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
  ClockIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/solid";
import axios from "axios";
import SEO from "../components/SEO";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // New states for filters and ongoing modal
  const [filterStatus, setFilterStatus] = useState("all");
  const [ongoingModalOpen, setOngoingModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrderData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        const sorted = response.data.orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Filter orders by status
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === filterStatus);

  // Ongoing orders (not cancelled or delivered)
  const ongoingOrders = orders.filter(
    (order) => order.orderStatus !== "cancelled" && order.orderStatus !== "delivered"
  );

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

  // Status style for badge
  const getStatusBadgeStyle = (status) => {
  const map = {
    placed: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
    packed: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
    shipped: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    delivered: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    cancelled: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
  };
  return map[status] || map.placed;
};

  // Status icon mapping
  const statusIcons = {
    placed: ClockIcon,
    packed: CubeIcon,
    shipped: TruckIcon,
    delivered: CheckCircleIcon,
    cancelled: XCircleIcon,
  };

  // -------- Skeleton Loader ----------
  const OrderSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30 animate-pulse">
      <div className="p-4 sm:p-6 border-b border-gray-200/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="h-4 w-20 bg-gray-200/70 rounded" />
            <div className="h-4 w-24 bg-gray-300/70 rounded mt-2" />
          </div>
          <div className="h-6 w-20 bg-gray-200/70 rounded-full" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gray-200/70 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-gray-300/70 rounded" />
              <div className="flex gap-2 mt-2">
                <div className="h-4 w-12 bg-gray-200/70 rounded" />
                <div className="h-4 w-12 bg-gray-200/70 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // -------- Empty State ----------
  const EmptyState = ({ icon: Icon, title, subtitle, buttonText, onPress }) => (
    <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Icon className="w-12 h-12 text-gray-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">{subtitle}</p>
      <button
        onClick={onPress}
        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        {buttonText}
      </button>
    </div>
  );

  // -------- Ongoing Orders Modal ----------
  const OngoingModal = () => {
    if (!ongoingModalOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeInUp"
        onClick={() => setOngoingModalOpen(false)}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-scaleIn border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
            <h3 className="text-xl font-bold text-gray-800">
              Ongoing Orders {ongoingOrders.length > 0 && `(${ongoingOrders.length})`}
            </h3>
            <button
              onClick={() => setOngoingModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {ongoingOrders.length === 0 ? (
              <div className="text-center py-10">
                <CubeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No ongoing orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {ongoingOrders.map((order) => {
                  const statusStyle = getStatusBadgeStyle(order.orderStatus);
                  const StatusIcon = statusIcons[order.orderStatus] || ClockIcon;
                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition cursor-pointer"
                      onClick={() => {
                        setOngoingModalOpen(false);
                        // navigate to order detail – you can implement if you have a detail page
                        // For now, just close and track
                        setTrackingOrder(order);
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {order.orderStatus.toUpperCase()}
                          </span>
                          <span className="text-sm font-mono text-gray-600">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">
                          {currency}
                          {(order.totalAmount || 0).toFixed(2)}
                        </p>
                        <span className="text-xs text-gray-400">Total</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // -------- Cancel Confirmation Modal ----------
  const CancelModal = () => {
    if (!cancelOrderId) return null;
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeInUp"
        onClick={() => setCancelOrderId(null)}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scaleIn border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center">
              <XCircleIcon className="w-8 h-8 text-rose-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
            Cancel Order
          </h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Are you sure you want to cancel this order? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCancelOrderId(null)}
              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition"
              disabled={cancelling}
            >
              No, Keep
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-xl font-medium transition disabled:opacity-50"
              disabled={cancelling}
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // -------- Main Render ----------
  return (
    <>
      <SEO
        title="My Orders | CraveNutri"
        description="View your order history, track shipments, and manage returns for CraveNutri products."
        url="https://cravenutri.com/orders"
        image="https://cravenutri.com/orders-og-image.jpg"
        noindex={true}
      />

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
          .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
          .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
          .order-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .order-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.2), 0 10px 10px -5px rgba(79, 70, 229, 0.1);
          }
        `}</style>

        <div className="max-w-5xl mx-auto">
          {/* ======== Header ======== */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 animate-fadeInUp">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                <ShoppingBagIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                <p className="text-sm text-gray-500">
                  {orders.length} order{orders.length !== 1 && "s"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Cube button with ongoing count */}
              <button
                onClick={() => setOngoingModalOpen(true)}
                className="relative p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
                title="Ongoing orders"
              >
                <CubeIcon className="w-6 h-6 text-gray-700" />
                {ongoingOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                    {ongoingOrders.length}
                  </span>
                )}
              </button>
              {/* Refresh button */}
              <button
                onClick={() => loadOrderData(true)}
                disabled={refreshing}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200 disabled:opacity-50"
              >
                <svg
                  className={`w-6 h-6 text-gray-700 ${refreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ======== Filter Chips ======== */}
          <div className="flex flex-wrap gap-2 mb-6 animate-fadeInUp">
            {["all", "placed", "packed", "shipped", "delivered", "cancelled"].map(
              (status) => {
                const isActive = filterStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                        : "bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {status.toUpperCase()}
                  </button>
                );
              }
            )}
          </div>

          {/* ======== Content ======== */}
          {loading ? (
            <div className="space-y-6">
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </div>
          ) : !token ? (
            <EmptyState
              icon={XCircleIcon}
              title="Unlock Order History"
              subtitle="Login to view your order details, real-time tracking, and invoice details."
              buttonText="Login / Sign Up"
              onPress={() => {}}
            />
          ) : orders.length === 0 ? (
            <EmptyState
              icon={ShoppingBagIcon}
              title="No Orders Yet"
              subtitle="You haven't placed any orders yet. Start exploring our high-protein, organic snacks now!"
              buttonText="Start Shopping"
              onPress={() => {}}
            />
          ) : filteredOrders.length === 0 ? (
            <EmptyState
              icon={XCircleIcon}
              title="No Results Found"
              subtitle={`We couldn't find any ${filterStatus} orders in your history.`}
              buttonText="Show All Orders"
              onPress={() => setFilterStatus("all")}
            />
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, index) => {
                const statusStyle = getStatusBadgeStyle(order.orderStatus);
                const StatusIcon = statusIcons[order.orderStatus] || ClockIcon;

                // Compute discount & savings
                let mrpSubtotal = 0;
                let discountFromItems = 0;
                if (order.items && order.items.length > 0) {
                  order.items.forEach((item) => {
                    const mrp = item.mrp || item.price || 0;
                    const price = item.price || 0;
                    const qty = item.quantity || 0;
                    mrpSubtotal += mrp * qty;
                    discountFromItems += (mrp - price) * qty;
                  });
                }
                const subtotal = order.subtotal || mrpSubtotal;
                const discountTotal = order.discountTotal || discountFromItems;
                const deliveryFee = order.deliveryFee || 0;
                const totalAmount =
                  order.totalAmount || (subtotal - discountTotal + deliveryFee);

                return (
                  <div
                    key={order._id}
                    className="order-card bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/30"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Order Header */}
                    <div
                      className="p-4 sm:p-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 cursor-pointer"
                      onClick={() => setTrackingOrder(order)}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              Order ID
                            </p>
                            <p className="font-mono text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              #{order._id.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-indigo-200 to-purple-200" />
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
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {order.orderStatus.toUpperCase()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTrackingOrder(order);
                            }}
                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 hover:scale-105 active:scale-95 border border-indigo-200/50"
                          >
                            <span>📍</span> Track
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 sm:p-6 space-y-4">
                      {order.items.slice(0, 2).map((item, idx) => {
                        const hasDiscount = item.mrp && item.mrp > item.price;
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-4 group/item transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 p-2 rounded-lg"
                          >
                            <Link
                              to={`/product/${item.product?._id}`}
                              className="block w-16 h-16 overflow-hidden rounded-lg border border-gray-200/70 flex-shrink-0"
                            >
                              <img
                                src={item.product?.images?.[0]?.url || "/placeholder.png"}
                                alt={item.product?.name}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
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
                                {hasDiscount && (
                                  <span className="text-gray-400 line-through">
                                    {currency}
                                    {item.mrp}
                                  </span>
                                )}
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {currency}
                                {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {order.items.length > 2 && (
                        <div className="text-sm text-gray-400 pl-2">
                          + {order.items.length - 2} more item
                          {order.items.length - 2 > 1 && "s"} in this order
                        </div>
                      )}
                    </div>

                    {/* Order Footer with Totals & Savings */}
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50/30 via-purple-50/30 to-pink-50/30 border-t border-gray-200/50">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">Payment:</span>
                          <span className="font-medium capitalize text-gray-700">
                            {order.paymentMethod}
                          </span>
                          <span
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.paymentStatus === "paid"
                                ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700"
                                : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Subtotal: {currency}{subtotal.toFixed(2)}</span>
                            {discountTotal > 0 && (
                              <span className="text-green-600">
                                -{currency}{discountTotal.toFixed(2)}
                              </span>
                            )}
                            <span>+ {currency}{deliveryFee.toFixed(2)}</span>
                          </div>
                          <div className="mt-1 flex items-center justify-end gap-3">
                            <span className="text-sm font-medium text-gray-600">Total:</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {currency}
                              {totalAmount.toFixed(2)}
                            </span>
                          </div>
                          {discountTotal > 0 && (
                            <div className="mt-1 text-xs text-green-600 flex items-center justify-end gap-1">
                              <span>🎉 You saved {currency}{discountTotal.toFixed(2)} on this order</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ======== Track Order Modal ======== */}
      {/* ======== Track Order Modal (Full Details) ======== */}
{trackingOrder && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeInUp"
    onClick={() => setTrackingOrder(null)}
  >
    <div
      className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn border border-white/40"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="sticky top-0 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200/70 px-6 py-4 flex justify-between items-center rounded-t-3xl z-10">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Order Details
          </h3>
          <p className="text-sm text-gray-500 font-mono">
            #{trackingOrder._id.slice(-8).toUpperCase()}
          </p>
        </div>
        <button
          onClick={() => setTrackingOrder(null)}
          className="p-2 hover:bg-white/50 rounded-full transition-all duration-200 hover:rotate-90"
        >
          <XCircleIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6 space-y-6">
        {/* Order Status & Date */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusBadgeStyle(
              trackingOrder.orderStatus
            ).bg} ${getStatusBadgeStyle(
              trackingOrder.orderStatus
            ).text} ${getStatusBadgeStyle(trackingOrder.orderStatus).border}`}
          >
            {trackingOrder.orderStatus.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(trackingOrder.createdAt)}
          </span>
        </div>

        {/* Delivery Address */}
        {trackingOrder.address && (
          <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Delivery Address
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {trackingOrder.address.fullName}<br />
              {trackingOrder.address.addressLine1}
              {trackingOrder.address.landmark && (
                <>, {trackingOrder.address.landmark}</>
              )}<br />
              {trackingOrder.address.city}, {trackingOrder.address.state}{" "}
              {trackingOrder.address.pincode}<br />
              {trackingOrder.address.country}<br />
              📞 {trackingOrder.address.mobile}
            </p>
          </div>
        )}

        {/* Items List */}
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-3">Items</h4>
          <div className="space-y-3">
            {trackingOrder.items.map((item, idx) => {
              const hasDiscount = item.mrp && item.mrp > item.price;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-3 bg-white/70 rounded-xl border border-gray-100 hover:shadow-sm transition"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={item.product?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.product?.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                      <span className="font-semibold text-indigo-600">
                        {currency}
                        {item.price}
                      </span>
                      {hasDiscount && (
                        <span className="text-gray-400 line-through text-xs">
                          {currency}
                          {item.mrp}
                        </span>
                      )}
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-600">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {currency}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Totals */}
        <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-200/60 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>{currency}{trackingOrder.subtotal?.toFixed(2) || "0.00"}</span>
          </div>
          {trackingOrder.discountTotal > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-{currency}{trackingOrder.discountTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span>{currency}{trackingOrder.deliveryFee?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="border-t border-gray-200/70 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-orange-600">
              {currency}
              {(trackingOrder.totalAmount || 0).toFixed(2)}
            </span>
          </div>
          {trackingOrder.discountTotal > 0 && (
            <div className="text-xs text-green-600 flex items-center justify-end gap-1">
              <span>🎉 You saved {currency}{trackingOrder.discountTotal.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Cancel Button (if applicable) */}
        {["placed", "packed"].includes(trackingOrder.orderStatus) && (
          <button
            onClick={() => {
              setTrackingOrder(null);
              setCancelOrderId(trackingOrder._id);
            }}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  </div>
)}

      {/* ======== Ongoing Orders Modal ======== */}
      <OngoingModal />

      {/* ======== Cancel Confirmation Modal ======== */}
      <CancelModal />
    </>
  );
};

export default Orders;
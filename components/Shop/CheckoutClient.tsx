"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type PaymentMethod = "mpesa" | "card";

export default function CheckoutClient() {
    const { cartDetails, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
    const [isProcessing, setIsProcessing] = useState(false);

    // Form states
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [mpesaPhone, setMpesaPhone] = useState("");

    // Card details
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const cartItems = Object.values(cartDetails ?? {});
    const shipping = 0; // Free shipping for now
    const total = totalPrice + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !phone) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (paymentMethod === "mpesa" && !mpesaPhone) {
            toast.error("Please enter your M-Pesa phone number");
            return;
        }

        if (paymentMethod === "card" && (!cardNumber || !cardName || !expiryDate || !cvv)) {
            toast.error("Please fill in all card details");
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            toast.success("Order placed successfully!");
            clearCart();
            router.push("/");
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-dark mb-4">Your cart is empty</h2>
                    <p className="text-dark-4 mb-6">Add some items to your cart to checkout</p>
                    <button
                        onClick={() => router.push("/shop-with-sidebar")}
                        className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-dark transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-dark mb-2">Checkout</h1>
                        <p className="text-dark-4">Complete your order</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-dark mb-4">Contact Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                        placeholder="+254 700 000 000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mb-8 pb-8 border-b border-gray-3">
                            <h2 className="text-xl font-semibold text-dark mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-1 flex-shrink-0">
                                            <Image
                                                src={item.image ?? "/images/placeholder.png"}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-dark truncate">{item.name}</p>
                                            <p className="text-sm text-dark-4">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-dark">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2 pt-4 border-t border-gray-3">
                                <div className="flex justify-between text-dark-4">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-dark-4">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-dark pt-2 border-t border-gray-3">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-dark mb-4">Payment Method</h2>

                            {/* M-Pesa Option */}
                            <div
                                onClick={() => setPaymentMethod("mpesa")}
                                className={`mb-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                                    paymentMethod === "mpesa"
                                        ? "border-blue bg-blue/5"
                                        : "border-gray-3 hover:border-gray-4"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === "mpesa"}
                                        onChange={() => setPaymentMethod("mpesa")}
                                        className="w-4 h-4"
                                    />
                                    <div className="flex items-center gap-2 flex-1">
                                        <Image
                                            src="/images/payment/payment-06.svg"
                                            alt="M-Pesa"
                                            width={40}
                                            height={40}
                                        />
                                        {/*<span className="font-semibold text-dark">M-Pesa</span>*/}
                                    </div>
                                </div>
                                {paymentMethod === "mpesa" && (
                                    <div className="ml-7">
                                        <label htmlFor="mpesa-phone" className="block text-sm font-medium text-dark mb-2">
                                            M-Pesa Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="mpesa-phone"
                                            value={mpesaPhone}
                                            onChange={(e) => setMpesaPhone(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                            placeholder="254 700 000 000"
                                            required
                                        />
                                        <p className="text-xs text-dark-4 mt-2">
                                            You will receive an M-Pesa prompt on this number
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Card Option */}
                            <div
                                onClick={() => setPaymentMethod("card")}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                                    paymentMethod === "card"
                                        ? "border-blue bg-blue/5"
                                        : "border-gray-3 hover:border-gray-4"
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                        className="w-4 h-4"
                                    />
                                    <div className="flex items-center gap-2 flex-1">
                                        <svg className="w-8 h-8 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className="font-semibold text-dark">Credit/Debit Card</span>
                                    </div>
                                </div>
                                {paymentMethod === "card" && (
                                    <div className="ml-7 space-y-4">
                                        <div>
                                            <label htmlFor="card-number" className="block text-sm font-medium text-dark mb-2">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                id="card-number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength={19}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="card-name" className="block text-sm font-medium text-dark mb-2">
                                                Cardholder Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="card-name"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                                placeholder="JOHN DOE"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiry" className="block text-sm font-medium text-dark mb-2">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expiry"
                                                    value={expiryDate}
                                                    onChange={(e) => setExpiryDate(e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-dark mb-2">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-3 rounded-lg focus:outline-none focus:border-blue"
                                                    placeholder="123"
                                                    maxLength={4}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full py-4 bg-blue text-white font-semibold rounded-lg hover:bg-blue-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                `Complete Order - ${formatPrice(total)}`
                            )}
                        </button>

                        {/* Security Notice */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-dark-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Secure checkout powered by Stripe</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
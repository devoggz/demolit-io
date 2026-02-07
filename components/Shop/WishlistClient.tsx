"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";
import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { WishlistItem } from "@/types/wishlistItem";

export default function WishlistClient() {
    const router = useRouter();
    const dispatch = useAppDispatch(); // ✅ correct usage
    const { addItem } = useCart(); // ✅ correct method name

    const wishlistItems = useAppSelector(
        (state) => state.wishlistReducer.items
    ) as WishlistItem[];

    const handleRemove = (id: string) => {
        dispatch(removeItemFromWishlist(id)); // ✅ correct action
        toast.success("Removed from wishlist");
    };

    const handleAddToCart = (item: WishlistItem) => {
        addItem({
            id: item.id,
            name: item.title, // mapping title → name for cart system
            price: item.price,
            image: item.image,
            quantity: 1,
            slug: item.slug,
            color: item.color,
        });
        toast.success("Added to cart");
    };

    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-24">
                <div className="text-center max-w-md">
                    <h1 className="text-3xl font-bold text-dark mb-3">
                        Your wishlist is empty
                    </h1>
                    <p className="text-dark-4 mb-6">
                        Desire exists. Objects do not. Philosophically tragic.
                    </p>
                    <button
                        onClick={() => router.push("/shop-with-sidebar")}
                        className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue-dark transition"
                    >
                        Browse products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-dark">My Wishlist</h1>
                    <p className="text-dark-4">
                        Emotionally curated capitalism.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
                        >
                            <Link href={`/product/${item.slug}`}>
                                <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
                                    <Image
                                        src={item.image || "/images/placeholder.png"}
                                        alt={item.title} // ✅ title not name
                                        fill
                                        className="object-contain p-3"
                                    />
                                </div>
                            </Link>

                            <div className="flex-1">
                                <Link href={`/product/${item.slug}`}>
                                    <h3 className="font-semibold text-dark line-clamp-2 hover:text-blue transition">
                                        {item.title} {/* ✅ title */}
                                    </h3>
                                </Link>

                                <p className="text-blue font-bold mt-2">
                                    {formatPrice(item.price)}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="flex-1 py-2 text-sm bg-blue text-white rounded-lg hover:bg-blue-dark transition"
                                >
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="px-3 py-2 text-sm border border-gray-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

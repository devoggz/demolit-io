"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { formatPrice } from "@/utils/formatePrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";
import { useCart } from "@/hooks/useCart";
import { AppDispatch } from "@/redux/store";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { openWhatsAppOrder } from "@/utils/whatsappOrder";

interface SerializedProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  discountedPrice?: number; // Changed from number | null to number | undefined
  quantity: number;
  shortDescription?: string;
  description?: string; // Changed from string | null to string | undefined
  sku?: string; // Changed from string | null to string | undefined
  reviews: number;
  tags?: string[];
  offers?: string[];
  updatedAt: string;
  category?: {
    title: string;
    slug: string;
  };
  productVariants: Array<{
    image: string;
    color?: string;
    size?: string;
    isDefault?: boolean;
  }>;
  additionalInformation?: Array<{
    name: string;
    description: string;
  }>;
}

interface ProductPageClientProps {
  product: SerializedProduct;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(() => {
    const defaultIndex = product.productVariants.findIndex((v) => v.isDefault);

    return defaultIndex >= 0 ? defaultIndex : 0;
  });
  const [quantity, setQuantity] = useState(1);

  const { addItem, cartDetails } = useCart();
  const dispatch = useDispatch<AppDispatch>();

  const selectedVariant = product.productVariants[selectedVariantIndex];
  const allVariants = product.productVariants;

  const isAlreadyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id === product.id,
  );

  const cartItem = {
    id: product.id,
    name: product.title,
    price: product.discountedPrice ? product.discountedPrice : product.price,
    currency: "usd",
    image: selectedVariant?.image || "",
    slug: product.slug,
    availableQuantity: product.quantity,
    color: selectedVariant?.color || "",
    size: selectedVariant?.size || "",
  };

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      // @ts-ignore
      addItem({ ...cartItem, quantity });
      toast.success(`${quantity} item(s) added to cart!`);
    } else {
      toast.error("This product is out of stock!");
    }
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: product.id,
        title: product.title,
        slug: product.slug,
        image: selectedVariant?.image || "",
        price: product.discountedPrice
          ? product.discountedPrice
          : product.price,
        quantity: product.quantity,
        color: selectedVariant?.color || "",
      }),
    );
  };

  const handleWhatsAppOrder = () => {
    openWhatsAppOrder(
      product.title,
      product.discountedPrice || product.price,
      product.slug,
      quantity,
      selectedVariant?.color,
      selectedVariant?.size,
      product.sku,
    );
    toast.success("Opening WhatsApp...");
  };

  const incrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="pt-35 pb-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-15">
          {/* Left Side - Product Images */}
          <div>
            <div className="relative overflow-hidden border border-gray-3 flex items-center justify-center rounded-xl bg-[#F6F7FB] min-h-[500px] mb-4">
              <Image
                alt={product.title}
                className="object-contain"
                height={500}
                src={selectedVariant?.image || "/images/placeholder.png"}
                width={500}
              />
              {product.discountedPrice && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 text-sm font-medium text-white rounded-full bg-green-bright">
                    {calculateDiscountPercentage(
                      product.discountedPrice,
                      product.price,
                    )}
                    % OFF
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {allVariants.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allVariants.map((variant, index) => (
                  <div
                    key={index}
                    className={`relative min-w-20 w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition ${
                      selectedVariantIndex === index
                        ? "border-blue ring-2 ring-blue"
                        : "border-gray-3 hover:border-blue"
                    }`}
                    onClick={() => setSelectedVariantIndex(index)}
                  >
                    <Image
                      fill
                      alt={`${product.title} - ${variant.color || "variant"}`}
                      className="object-contain p-2"
                      src={variant.image}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dark mb-4">
              {product.title}
            </h1>

            {/* Rating and Stock */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400 text-lg">
                  {"★".repeat(5)}
                </div>
                <span className="text-sm text-dark-4">
                  ({product.reviews} reviews)
                </span>
              </div>
              {product.quantity > 0 ? (
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  In Stock ({product.quantity} available)
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-600 text-sm font-medium">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                {product.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-dark">
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span className="text-xl line-through text-dark-4">
                      {formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-dark">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-base text-dark-4 mb-6 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Color Display */}
            {selectedVariant?.color && (
              <div className="mb-6">
                <p className="text-sm font-medium text-dark mb-3">
                  Color:{" "}
                  <span className="text-dark-6 font-semibold">
                    {selectedVariant.color}
                  </span>
                </p>
              </div>
            )}

            {/* Size Display */}
            {selectedVariant?.size && (
              <div className="mb-6">
                <p className="text-sm font-medium text-dark mb-3">
                  Size:{" "}
                  <span className="text-dark-6 font-semibold">
                    {selectedVariant.size}
                  </span>
                </p>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-3 rounded-lg">
                  <button
                    className="px-4 py-3 hover:bg-gray-1 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                    disabled={quantity <= 1}
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    className="w-16 text-center border-x-2 border-gray-3 py-3 focus:outline-none font-semibold"
                    max={product.quantity}
                    min={1}
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;

                      if (val >= 1 && val <= product.quantity) {
                        setQuantity(val);
                      }
                    }}
                  />
                  <button
                    className="px-4 py-3 hover:bg-gray-1 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
                    disabled={quantity >= product.quantity}
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="flex-1 px-8 py-3 font-medium text-white bg-green-bright/90 rounded-lg hover:bg-dark-6 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.quantity < 1 || isAlreadyAdded}
                  onClick={handleAddToCart}
                >
                  {isAlreadyAdded
                    ? "Already in Cart"
                    : product.quantity > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                </button>

                {/* Wishlist Button */}
                {/*<WishlistButton*/}
                {/*    item={product}*/}
                {/*    handleItemToWishList={handleItemToWishList}*/}
                {/*/>*/}
              </div>

              {/* WhatsApp Order Button */}
              <button
                className="w-full px-8 py-3.5 font-semibold text-white bg-dark-6 rounded-lg hover:bg-green-bright transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                onClick={handleWhatsAppOrder}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Order on WhatsApp
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 border-t border-gray-3 pt-6">
              {product.sku && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-4">SKU:</span>
                  <span className="text-sm text-dark font-medium">
                    {product.sku}
                  </span>
                </div>
              )}

              {product.category && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-4">
                    Category:
                  </span>
                  <span className="text-sm text-dark font-medium">
                    {product.category.title}
                  </span>
                </div>
              )}

              {product.tags && product.tags.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-dark-4 mt-0.5">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-1 text-dark rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-3 pt-10">
          {/* Description Tab */}
          {product.description && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-dark mb-6">Description</h2>
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="prose prose-sm max-w-none text-dark-4 leading-relaxed"
              />
            </div>
          )}

          {/* Additional Information */}
          {product.additionalInformation &&
            product.additionalInformation.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  Additional Information
                </h2>
                <div className="border border-gray-3 rounded-lg overflow-hidden">
                  {product.additionalInformation.map((info, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-1 sm:grid-cols-2 ${
                        index % 2 === 0 ? "bg-gray-1" : "bg-white"
                      }`}
                    >
                      <div className="p-4 font-semibold text-dark border-b sm:border-b-0 sm:border-r border-gray-3">
                        {info.name}
                      </div>
                      <div className="p-4 text-dark-4">{info.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">
              Customer Reviews ({product.reviews})
            </h2>
            <div className="p-8 bg-gray-1 rounded-lg text-center">
              <p className="text-dark-4">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

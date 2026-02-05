import { getProductBySlug } from "@/components/get-api-data/product";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/utils/formatePrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";

export default async function ProductPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const defaultVariant = product.productVariants.find((v) => v.isDefault);
    const allVariants = product.productVariants;

    return (

        <div className="pt-35 pb-20">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
                {/* Product Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-15">
                    {/* Left Side - Product Images */}
                    <div>
                        <div className="relative overflow-hidden border border-gray-3 flex items-center justify-center rounded-xl bg-[#F6F7FB] min-h-[500px] mb-4">
                            <Image
                                src={defaultVariant?.image || "/images/placeholder.png"}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="object-contain"
                            />
                            {product.discountedPrice && (
                                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 text-sm font-medium text-white rounded-full bg-blue">
                    {calculateDiscountPercentage(
                        product.discountedPrice,
                        product.price
                    )}
                      % OFF
                  </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {allVariants.length > 1 && (
                            <div className="flex gap-3">
                                {allVariants.slice(0, 4).map((variant, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-20 border-2 border-gray-3 rounded-lg overflow-hidden cursor-pointer hover:border-blue"
                                    >
                                        <Image
                                            src={variant.image}
                                            alt={`${product.title} - ${variant.color}`}
                                            fill
                                            className="object-contain p-2"
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
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-400">
                                    {"★".repeat(5)}
                                </div>
                                <span className="text-sm text-dark-4">
                  ({product.reviews} customer reviews)
                </span>
                            </div>
                            {product.quantity > 0 ? (
                                <span className="flex items-center gap-2 text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-red-600">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3">
                                {product.discountedPrice ? (
                                    <>
                    <span className="text-2xl font-bold text-dark">
                      {formatPrice(product.discountedPrice)}
                    </span>
                                        <span className="text-xl line-through text-dark-4">
                      {formatPrice(product.price)}
                    </span>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold text-dark">
                    {formatPrice(product.price)}
                  </span>
                                )}
                            </div>
                        </div>

                        {/* Short Description */}
                        <p className="text-base text-dark-4 mb-6">
                            {product.shortDescription}
                        </p>

                        {/* Color Options */}
                        {allVariants.length > 0 && (
                            <div className="mb-6">
                                <p className="text-sm font-medium text-dark mb-3">Color:</p>
                                <div className="flex items-center gap-3">
                                    {[...new Set(allVariants.map((v) => v.color))].map(
                                        (color, index) => (
                                            <button
                                                key={index}
                                                className="w-8 h-8 rounded-full border-2 border-gray-3 hover:border-blue flex items-center justify-center"
                                                style={{
                                                    backgroundColor:
                                                        color.toLowerCase() === "black"
                                                            ? "#000"
                                                            : color.toLowerCase() === "white"
                                                                ? "#fff"
                                                                : color.toLowerCase(),
                                                }}
                                                title={color}
                                            >
                                                {index === 0 && (
                                                    <span className="w-3 h-3 bg-white rounded-full"></span>
                                                )}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Actions */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center border border-gray-3 rounded-lg">
                                <button className="px-4 py-3 hover:bg-gray-1">-</button>
                                <input
                                    type="number"
                                    defaultValue={1}
                                    min={1}
                                    max={product.quantity}
                                    className="w-16 text-center border-x border-gray-3 py-3"
                                />
                                <button className="px-4 py-3 hover:bg-gray-1">+</button>
                            </div>

                            <button
                                className="flex-1 px-8 py-3 font-medium text-white bg-blue rounded-lg hover:bg-blue-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={product.quantity < 1}
                            >
                                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>

                            <button className="p-3 border border-gray-3 rounded-lg hover:border-blue hover:text-blue transition">
                                ♡
                            </button>
                        </div>

                        {/* Additional Info */}
                        {product.sku && (
                            <div className="mb-4">
                                <span className="text-sm text-dark-4">SKU: </span>
                                <span className="text-sm text-dark">{product.sku}</span>
                            </div>
                        )}

                        {product.category && (
                            <div className="mb-4">
                                <span className="text-sm text-dark-4">Category: </span>
                                <span className="text-sm text-dark">
                  {product.category.title}
                </span>
                            </div>
                        )}

                        {product.tags && product.tags.length > 0 && (
                            <div className="mb-4">
                                <span className="text-sm text-dark-4">Tags: </span>
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="text-sm text-dark">
                    {tag}
                                        {index < product.tags!.length - 1 && ", "}
                  </span>
                                ))}
                            </div>
                        )}

                        {/* Offers */}
                        {product.offers && product.offers.length > 0 && (
                            <div className="mt-6 p-4 bg-blue/5 rounded-lg">
                                <p className="text-sm font-medium text-dark mb-2">
                                    Special Offers:
                                </p>
                                <ul className="space-y-1">
                                    {product.offers.map((offer, index) => (
                                        <li key={index} className="text-sm text-dark-4 flex items-center gap-2">
                                            <span className="text-green-600">✓</span>
                                            {offer}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t border-gray-3 pt-10">
                    {/* Description Tab */}
                    {product.description && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-dark mb-4">Description</h2>
                            <div
                                className="prose prose-sm max-w-none text-dark-4"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>
                    )}

                    {/* Additional Information */}
                    {product.additionalInformation &&
                        product.additionalInformation.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-dark mb-4">
                                    Additional Information
                                </h2>
                                <div className="border border-gray-3 rounded-lg overflow-hidden">
                                    {product.additionalInformation.map((info, index) => (
                                        <div
                                            key={index}
                                            className={`grid grid-cols-2 ${
                                                index % 2 === 0 ? "bg-gray-1" : "bg-white"
                                            }`}
                                        >
                                            <div className="p-4 font-medium text-dark border-r border-gray-3">
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
                        <h2 className="text-2xl font-bold text-dark mb-4">
                            Customer Reviews ({product.reviews})
                        </h2>
                        <p className="text-dark-4">Reviews will be displayed here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
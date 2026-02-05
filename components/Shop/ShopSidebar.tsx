"use client";
import { Category } from "@/types/category";
import Link from "next/link";
import { useState } from "react";

type Props = {
    categories: Category[];
    totalProducts: number;
};

export default function ShopSidebar({ categories, totalProducts }: Props) {
    const [priceRange, setPriceRange] = useState([0, 999]);
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        size: true,
        colors: true,
        price: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const colors = [
        { name: "Gray", hex: "#808080" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Black", hex: "#000000" },
        { name: "Green", hex: "#008000" },
        { name: "Cyan", hex: "#00FFFF" },
        { name: "White", hex: "#FFFFFF", border: true },
        { name: "Red", hex: "#FF0000" },
    ];

    const sizes = ["XL", "XXL"];

    return (
        <div className="space-y-6">
            {/* Filters Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-dark">Filters:</h3>
                <button className="text-sm text-blue hover:underline">Clean All</button>
            </div>

            {/* Category Filter */}
            <div className="border-t border-gray-3 pt-6">
                <button
                    onClick={() => toggleSection("category")}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="text-base font-semibold text-dark">Category</h4>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.category ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {expandedSections.category && (
                    <ul className="space-y-3">
                        {categories.map((category) => (
                            <li key={category._id}>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="flex items-center justify-between text-sm text-dark-4 hover:text-blue transition"
                                >
                                    <span>{category.title}</span>
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-1 text-xs">
                    {category.productCount}
                  </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Size Filter */}
            <div className="border-t border-gray-3 pt-6">
                <button
                    onClick={() => toggleSection("size")}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="text-base font-semibold text-dark">Size</h4>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.size ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {expandedSections.size && (
                    <div className="flex gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className="px-4 py-2 text-sm border border-gray-3 rounded-lg hover:border-blue hover:text-blue transition"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Colors Filter */}
            <div className="border-t border-gray-3 pt-6">
                <button
                    onClick={() => toggleSection("colors")}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="text-base font-semibold text-dark">Colors</h4>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.colors ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {expandedSections.colors && (
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.name}
                                className={`w-10 h-10 rounded-full border-2 border-gray-3 hover:border-blue transition ${
                                    color.border ? "border-gray-3" : ""
                                }`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-gray-3 pt-6">
                <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full mb-4"
                >
                    <h4 className="text-base font-semibold text-dark">Price</h4>
                    <svg
                        className={`w-5 h-5 transition-transform ${
                            expandedSections.price ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {expandedSections.price && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-dark-4">${priceRange[0]}</span>
                            <span className="text-sm text-dark-4">${priceRange[1]}</span>
                        </div>

                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="999"
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                                }
                                className="w-full h-2 bg-gray-3 rounded-lg appearance-none cursor-pointer accent-blue"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
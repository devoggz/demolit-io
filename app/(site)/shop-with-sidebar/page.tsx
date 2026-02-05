import { getAllProducts } from "@/components/get-api-data/product";
import { getCategories } from "@/components/get-api-data/category";
import ProductItem from "@/components/Common/ProductItem";
import ShopSidebar from "@/components/Shop/ShopSidebar";

export default async function ShopWithSidebarPage() {
    const products = await getAllProducts();
    const categories = await getCategories();

    return (
        <div className="pt-35 pb-20">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <ShopSidebar
                            categories={categories}
                            totalProducts={products.length}
                        />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">


                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7.5 gap-y-9">
                            {products.map((item) => (
                                <ProductItem
                                    key={item.id}   // ✅ FIXED: stable, correct key
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mt-10">
                            <button
                                className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1 disabled:opacity-50"
                                disabled
                            >
                                Previous
                            </button>
                            <button className="px-4 py-2 bg-blue text-white rounded-lg">
                                1
                            </button>
                            <button className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1">
                                2
                            </button>
                            <button className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1">
                                3
                            </button>
                            <button className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1">
                                Next
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

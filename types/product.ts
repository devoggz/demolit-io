/**
 * Product type definition
 * Used for listings, category pages, grids, etc.
 */
export interface Product {
    id: string;
    title: string;
    price: number;
    discountedPrice?: number | null;
    slug: string;
    quantity: number;
    updatedAt: Date | string; // Date from Prisma, string after serialization
    reviews: number;
    shortDescription: string;

    // ✅ ADD THIS — required for category filtering
    category?: {
        title: string;
        slug?: {
            current: string;
        };
    } | null;

    productVariants: {
        color: string;
        image: string;
        size: string;
        isDefault: boolean;
    }[];
}

/**
 * Detailed product type
 * Used for product detail pages
 */
export interface IProductByDetails {
    id: string;
    title: string;
    shortDescription: string;
    description: string | null;
    price: number;
    discountedPrice?: number | null;
    slug: string;
    quantity: number;
    updatedAt: Date | string;

    // ✅ Slug shape matches Sanity-style slug usage
    category: {
        title: string;
        slug?: {
            current: string;
        };
    } | null;

    productVariants: {
        color: string;
        image: string;
        size: string;
        isDefault: boolean;
    }[];

    reviews: number;

    additionalInformation: {
        name: string;
        description: string;
    }[];

    customAttributes: {
        attributeName: string;
        attributeValues: {
            id: string;
            title: string;
        }[];
    }[];

    body: string | null;
    tags: string[] | null;
    offers: string[] | null;
    sku: string | null;
}

/**
 * Product with ID and Title only
 * Used for lightweight queries
 */
export interface ProductIdAndTitle {
    id: string;
    title: string;
}

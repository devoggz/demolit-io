"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import CheckoutBtn from "../Shop/CheckoutBtn";
import WishlistButton from "../Wishlist/AddWishlistButton";
import Tooltip from "./Tooltip";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { EyeIcon } from "@/app/assets/icons";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatePrice";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";

type Props = {
  bgClr?: string;
  item: Product;
};

const ProductItem = ({ item, bgClr = "[#F6F7FB]" }: Props) => {
  const defaultVariant = item?.productVariants.find(
    (variant) => variant.isDefault,
  );

  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const { addItem, cartDetails } = useCart();
  const router = useRouter();

  const isAlreadyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id === item.id,
  );

  const cartItem = {
    id: item.id,
    name: item.title,
    price: item.discountedPrice ? item.discountedPrice : item.price,
    currency: "kes",
    image: defaultVariant?.image ? defaultVariant.image : "",
    slug: item?.slug,
    availableQuantity: item.quantity,
    color: defaultVariant?.color ? defaultVariant.color : "",
    size: defaultVariant?.size ? defaultVariant.size : "",
  };

  const productUrl = `/products/${item?.slug}`;

  const handleQuickViewUpdate = () => {
    const serializableItem = {
      ...item,
      updatedAt:
        typeof item.updatedAt === "string"
          ? item.updatedAt
          : item.updatedAt.toISOString(),
    };

    dispatch(updateQuickView(serializableItem));
  };

  const handleAddToCart = (item: Product) => {
    if (item.quantity > 0) {
      // @ts-ignore
      addItem(cartItem);
      toast.success("Product added to cart!");
    } else {
      toast.error("This product is out of stock!");
    }
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: item.id,
        title: item.title,
        slug: item.slug,
        image: defaultVariant?.image ? defaultVariant.image : "",
        price: item.discountedPrice ? item.discountedPrice : item.price,
        quantity: item.quantity,
        color: defaultVariant?.color ? defaultVariant.color : "",
      }),
    );
  };

  return (
    <article className="group">
      {/* Clickable card header */}
      <button
        type="button"
        className="w-full text-left cursor-pointer"
        onClick={() => router.push(productUrl)}
      >
        <div
          className={`relative overflow-hidden border border-gray-3 flex items-center justify-center rounded-xl bg-${bgClr} min-h-[270px] mb-4`}
        >
          <Image
            alt={item.title || "product-image"}
            height={250}
            src={defaultVariant?.image ? defaultVariant.image : ""}
            width={250}
          />

          <div className="absolute top-2 right-2">
            {item.quantity < 1 ? (
              <span className="px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                Out of Stock
              </span>
            ) : item?.discountedPrice && item?.discountedPrice > 0 ? (
              <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-green-bright">
                {calculateDiscountPercentage(item.discountedPrice, item.price)}%
                OFF
              </span>
            ) : null}
          </div>

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <Tooltip content="Quick View" placement="top">
              <button
                type="button"
                className="border border-gray-3 h-[38px] w-[38px] rounded-lg flex items-center justify-center text-dark-6 bg-white hover:text-green-bright"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                  handleQuickViewUpdate();
                }}
              >
                <EyeIcon />
              </button>
            </Tooltip>

            {isAlreadyAdded ? (
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="p-0"
              >
                <CheckoutBtn />
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex px-5 py-2 font-medium h-[38px] text-white duration-200 ease-out rounded-lg text-custom-sm bg-dark-6 hover:bg-green-bright"
                disabled={item.quantity < 1}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                {item.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            )}

            {/* wishlist button */}
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="p-0"
            >
              <WishlistButton
                handleItemToWishList={handleItemToWishList}
                item={item}
              />
            </button>
          </div>
        </div>
      </button>

      <h3 className="font-semibold text-dark-6 ease-out text-base duration-200 hover:text-green-bright mb-1.5 line-clamp-1">
        {item.title}
      </h3>

      <span className="flex items-center gap-2 text-base font-medium">
        {item.discountedPrice && (
          <span className="line-through text-dark-4">
            {formatPrice(item.price)}
          </span>
        )}
        <span className="text-dark-6">
          {formatPrice(item.discountedPrice || item.price)}
        </span>
      </span>
    </article>
  );
};

export default ProductItem;

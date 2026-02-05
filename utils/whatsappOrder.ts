import { formatPrice } from "./formatePrice";

export const openWhatsAppOrder = (
    productTitle: string,
    productPrice: number,
    productSlug: string,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string,
    sku?: string,
    phoneNumber: string = "254747896429" // Replace with your WhatsApp business number
) => {
    const productUrl = `${window.location.origin}/products/${productSlug}`;

    let message = `🛍️ *New Order Request*\n\n`;
    message += `📦 *Product:* ${productTitle}\n`;
    message += `💰 *Price:* ${formatPrice(productPrice)}\n`;
    message += `🔢 *Quantity:* ${quantity}\n`;

    if (selectedColor) {
        message += `🎨 *Color:* ${selectedColor}\n`;
    }

    if (selectedSize) {
        message += `📏 *Size:* ${selectedSize}\n`;
    }

    if (sku) {
        message += `🏷️ *SKU:* ${sku}\n`;
    }

    const totalPrice = productPrice * quantity;
    message += `\n💵 *Total:* ${formatPrice(totalPrice)}\n`;
    message += `\n🔗 *Product Link:* ${productUrl}\n`;
    message += `\n✅ I would like to place this order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
};
import Image from "next/image";

const paymentsData = [




  {
    id: 1,
    image: "/images/payment/payment-06.svg",
    alt: "mpesa pay",
    width: 64,
    height: 30,
  },
  {
    id: 2,
    image: "/images/payment/payment-03.svg",
    alt: "master card",
    width: 33,
    height: 24,
  },
];

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="py-5 xl:py-7.5 border-t border-gray-5">
      <div className="px-4 mx-auto max-w-7xl sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="text-sm font-normal text-dark">
            &copy; {year}. All rights reserved by Kalawaks.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <p className="font-normal">We Accept:</p>

            <div className="flex flex-wrap items-center gap-5">
              {paymentsData.map((payment) => (
                <Image
                  className="h-5"
                  key={payment?.id}
                  src={payment.image}
                  alt={payment.alt}
                  width={payment.width}
                  height={payment.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

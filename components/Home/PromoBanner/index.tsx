import Image from "next/image";
import Link from "next/link";

import LargePromoBanner from "./LargePromoBanner";
import SmallPromoBanner from "./SmallPromoBanner";

const TreadmillPromoBanner = () => {
  return (
    <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
      <Image
        alt="promo img"
        className="absolute -translate-y-1/2 top-1/2 left-3 sm:left-10 -z-1"
        height={241}
        src="/images/products/product-7-bg-1.png"
        width={241}
      />
      <div className="text-right">
        <span className="block text-lg text-dark mb-1.5">
          Foldable Motorised Treadmill
        </span>
        <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
          Workout At Home
        </h2>
        <p className="font-semibold text-custom-1 text-teal">Flat 20% off</p>
        <Link
          className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
          href="#"
        >
          Grab Now
        </Link>
      </div>
    </div>
  );
};

const WatchPromoBanner = () => {
  return (
    <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
      <Image
        alt="promo img"
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
        height={200}
        src="/images/promo/promo-03.png"
        width={200}
      />
      <div>
        <span className="block text-lg text-dark mb-1.5">
          Apple Watch Ultra
        </span>
        <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
          Lipa Mdogo Mdogo
        </h2>
        <p className="max-w-[285px] text-custom-sm">
          The aerospace-grade titanium case strikes the perfect balance of
          everything.
        </p>
        <Link
          className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
          href={`/products/apple-watch-ultra`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

const PromoBanner = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-8 xl:px-0">
        <LargePromoBanner
          buttonText="Find Out More"
          description="iPhone 14 has the same superspeedy chip that's in iPhone 13 Pro, A15 Bionic, with a 5‑core GPU, powers all the latest features."
          imageUrl="/images/promo/promo-01.png"
          link="iphone-14-plus--6128gb"
          subtitle="Apple iPhone 14 Plus"
          title="Chukua, Lipa Polepole!"
        />
        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          <SmallPromoBanner
            buttonText="Grab the deal"
            discount="Flat 20% off"
            imageUrl="/images/promo/promo-05.png"
            link="smart-blender"
            subtitle="oraimo SmartBlender "
            title="Cup 1L Juice Blender"
          />

          <SmallPromoBanner
            buttonText="Grab the deal"
            description="More than 28-Day Standby, 7-Day Usage Time Extended Power, Uninterrupted Use"
            imageUrl="/images/promo/promo-04.png"
            link="/products/apple-watch-ultra"
            subtitle="Watch 5 Lite"
            title="Up to 40% off"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;

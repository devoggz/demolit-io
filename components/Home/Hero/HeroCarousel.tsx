"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";
import { IHeroSlider } from "@/types/hero";

const HeroCarousel = ({ sliders }: { sliders: IHeroSlider[] }) => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            effect="fade"
            fadeEffect={{
                crossFade: true
            }}
            speed={800}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination, EffectFade]}
            className="hero-carousel h-full"
        >
            {sliders?.map((slider: IHeroSlider, key: number) => (
                <SwiperSlide key={key} className="h-full">
                    <div
                        className="flex flex-col-reverse items-center justify-center bg-dark-6 h-full sm:flex-row"
                        style={{
                            backgroundBlendMode: 'soft-light',
                            backgroundImage: `url('/images/hero/pattern.svg')`,
                            backgroundSize: 'auto'
                        }}
                    >
                        <div className="max-w-[396px] py-10 sm:py-15 lg:py-24.5 pl-4 z-10 sm:pl-7.5 lg:pl-12.5">
                            <div className="flex items-center gap-4 mb-5">
                <span className="block font-bold text-heading-3 sm:text-[58px] text-green-bright">
                  {slider?.discountRate}%
                </span>
                                <span className="block text-sm uppercase text-meta-4 sm:text-xl sm:leading-6">
                  Sale
                  <br />
                  Off
                </span>
                            </div>
                            <h1 className="mb-3 text-xl font-semibold text-meta-5 sm:text-3xl">
                                <Link href="/shop-with-sidebar">
                                    {slider?.product?.title}
                                </Link>
                            </h1>
                            <p className="text-base text-meta-5">
                                {slider?.product?.shortDescription?.slice(0, 100)}
                            </p>
                            <Link
                                href="/shop-with-sidebar"
                                className="inline-flex py-3 mt-10 font-medium text-white duration-200 ease-out rounded-lg text-custom-sm bg-green-bright/80 px-9 hover:bg-dark"
                            >
                                Shop Now
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src={slider?.sliderImage || "/no-image.png"}
                                alt={slider?.product?.title || "Product"}
                                width={340}
                                height={440}
                                loading="eager"
                            />
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HeroCarousel;
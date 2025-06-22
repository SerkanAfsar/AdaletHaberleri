"use client";
import { NewsDetailPickType } from "@/Services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { generateNewsUrl } from "@/Utils";
import Link from "next/link";
import CustomImage from "../Common/CustomImage";

export default function HeroSliderContent({
  items,
}: {
  items: NewsDetailPickType[];
}) {
  return (
    <div className="h-full w-full">
      <Swiper
        className="h-full"
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        fadeEffect={{ crossFade: true }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index} className="relative h-full w-full">
              <figure className="h-full w-full before:absolute before:inset-0 before:z-10 before:bg-black/20 before:content-['']">
                <CustomImage
                  width={1500}
                  height={400}
                  imageId={item?.imageId ?? null}
                  title={item?.title ?? ""}
                  className="h-full w-full object-cover object-center"
                  keyField="ExtraLarge"
                />

                <figcaption className="absolute right-0 bottom-0 left-0 z-10 block bg-red-500/90 p-5 text-white md:right-10 md:bottom-10 md:left-10">
                  <Link
                    className="font-semibold uppercase underline before:absolute before:inset-0 before:h-full before:w-full before:content-[''] lg:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: item?.title || "Haber",
                    }}
                    href={generateNewsUrl(
                      item?.Category?.categoryName || "",
                      item?.title || "",
                      item?.id || 0,
                    )}
                  ></Link>
                </figcaption>
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

"use client";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LastNewsSingleItem from "../LastNewsSection/LastNewsSingleItem";

import { ChevronLeft, ChevronRight } from "lucide-react";
export default function MostReadedSlider({ items }: { items: any[] }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Swiper
        className="h-full w-full"
        modules={[Navigation, Autoplay]}
        slidesPerView={4}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <LastNewsSingleItem
                hasBorder={false}
                item={{ type: "small", ...item } as any}
                key={item.id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mr-auto mb-4 flex gap-2 text-white">
        <button
          type="button"
          aria-label="Önceki"
          className="swiperButtons swiper-button-prev-custom"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Sonraki"
          type="button"
          className="swiperButtons swiper-button-next-custom"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

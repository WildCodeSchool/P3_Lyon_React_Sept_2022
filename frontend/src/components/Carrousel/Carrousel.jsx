import React from "react";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

function Carrousel() {
  return (
    <div className="carrousel-container">
      <Swiper
        className="h-44"
        // install Swiper modules
        modules={[Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={2.5}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.warn(swiper)}
        onSlideChange={() => console.warn("slide change")}
      >
        <SwiperSlide className="flex bg-blue-400 justify-center items-center">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="flex bg-blue-400 justify-center items-center">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="flex bg-blue-400 justify-center items-center">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="flex bg-blue-400 justify-center items-center">
          Slide 4
        </SwiperSlide>
        <SwiperSlide className="flex bg-blue-400 justify-center items-center">
          Slide 5
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
}

export default Carrousel;

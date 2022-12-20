import React from "react";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

const groupes = [
  { id: 1, groupname: "Communication Agence", imageurl: "" },
  { id: 2, groupname: "Métier", imageurl: "" },
  { id: 3, groupname: "Prévention", imageurl: "" },
  { id: 4, groupname: "Entre nous", imageurl: "" },
  { id: 5, groupname: "Clients", imageurl: "" },
];

function Carrousel() {
  return (
    <div className="carrousel-container pt-8">
      <Swiper
        className="h-36"
        // install Swiper modules
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={2.5}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.warn(swiper)}
        onSlideChange={() => console.warn("slide change")}
      >
        {groupes.map((groupe) => (
          <SwiperSlide className="group-card flex bg-cover bg-[url('./assets/solar-groups.jpeg')] justify-center items-center align-middle text-center">
            <p className="text-primary font-bold bg-white opacity-50 h-1/3 w-11/12 flex justify-center items-center rounded">
              {groupe.groupname}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carrousel;

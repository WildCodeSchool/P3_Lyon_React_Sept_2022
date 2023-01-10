import React, { useEffect, useState } from "react";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePostUserContext } from "../../contexts/PostUserContext";

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

function Carrousel() {
  const [groupId, setGroupId] = useState();
  const { groupes, categories, isGroup, setIsGroup } = usePostUserContext();

  useEffect(() => {
    setIsGroup(false);
  }, []);

  const handleCategory = (value) => {
    setGroupId(value);
    setIsGroup(true);
  };

  return (
    <div className="carrousel-container pt-8">
      <Swiper
        className={!isGroup ? "h-36" : "h-20"}
        // install Swiper modules
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={2.5}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.warn(swiper)}
        // onSlideChange={() => console.warn("slide change")}
      >
        {!isGroup ? (
          <>
            {groupes.map((groupe) => (
              <SwiperSlide
                key={groupe.id}
                className="group-card flex bg-cover bg-[url('./assets/solar-groups.jpeg')] justify-center items-center align-middle text-center cursor-pointer"
                onClick={() => handleCategory(groupe.id)}
              >
                <p className="text-primary font-bold bg-white opacity-50 h-1/3 w-11/12 flex justify-center items-center rounded">
                  {groupe.groupname}
                </p>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {categories
              .filter((category) => category.group_id === groupId)
              .map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="group-card flex bg-cover bg-primary justify-center items-center align-middle text-center"
                >
                  <p className="text-primary font-bold bg-white opacity-50 h-1/3 w-11/12 flex justify-center items-center rounded">
                    {category.categoryname}
                  </p>
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
    </div>
  );
}

export default Carrousel;

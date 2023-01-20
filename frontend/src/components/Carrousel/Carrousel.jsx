import React, { useEffect } from "react";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePostUserContext } from "../../contexts/PostUserContext";

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

function Carrousel() {
  const {
    groupList,
    categoryList,
    groupId,
    setGroupId,
    categoryId,
    setCategoryId,
  } = usePostUserContext();

  useEffect(() => {
    setGroupId(0);
    setCategoryId(0);
  }, []);

  const handleGroup = (value) => {
    setGroupId(value);
  };

  const handleCategory = (value) => {
    setCategoryId(value);
  };

  return (
    <div className="carrousel-container pt-8 md:h-1/4 md:w-80 md:ml-[-350px] md:bg-white md:mt-48 md:shadow-md md:rounded-lg">
      <h2 className="text-primary text-center text-xl mb-4 md:text-3xl">
        {groupId
          ? groupList
              .filter((group) => group.id === groupId)
              .map((group) => group.group_name)
          : "Mes Groupes"}
        <br />
        {categoryId > 0 &&
          categoryList
            .filter((category) => category.id === categoryId)
            .map((category) => category.category_name)}
      </h2>
      <Swiper
        className={
          !groupId
            ? "h-36 md:w-[475px]  md:hidden"
            : "h-20 md:w-[475px]  md:hidden"
        }
        // install Swiper modules
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={2.5}
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.warn(swiper)}
        // onSlideChange={() => console.warn("slide change")}
      >
        {!groupId ? (
          <>
            {groupList.map((group) => (
              <SwiperSlide
                key={group.id}
                className="group-card flex bg-cover justify-center items-center align-middle text-center cursor-pointer"
                onClick={() => handleGroup(group.id)}
                style={{ backgroundImage: `url(${group.image})` }}
              >
                <p className="text-primary font-bold bg-white opacity-50 h-1/3 w-11/12 flex justify-center items-center rounded">
                  {group.group_name}
                </p>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {categoryList
              .filter((category) => category.group_id === groupId)
              .map((category) => (
                <SwiperSlide
                  key={category.id}
                  className="group-card flex bg-cover justify-center items-center align-middle text-center cursor-pointer"
                  onClick={() => handleCategory(category.id)}
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <p className="text-primary font-bold bg-white opacity-70 h-1/3 w-11/12 flex justify-center items-center rounded">
                    {category.category_name}
                  </p>
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
      <div className=" hidden md:block ">
        {groupList.map((group) => {
          return (
            <button
              type="button"
              className=" md:flex md:flex-col md:text-xl mb:border-b md:border md:p-3 md:mb-3 md:text-center md:mx-auto "
              key={group.id}
            >
              {group.group_name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Carrousel;

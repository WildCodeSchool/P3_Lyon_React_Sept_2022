/* eslint-disable import/no-unresolved */
import React from "react";
import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePostUserContext } from "../../contexts/PostUserContext";
import croix from "../../assets/close-red.png";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Carrousel({ groupId, setGroupId, categoryId, setCategoryId }) {
  const { groupList, categoryList } = usePostUserContext();

  const backToZero = () => {
    setGroupId(0);
    setCategoryId(0);
  };

  const handleGroup = (value) => {
    setGroupId(value);
  };

  const handleCategory = (value) => {
    setCategoryId(value);
  };
  return (
    <div className="carrousel-container pt-8 md:h-fit md:w-80 md:ml-[-350px] md:bg-white md:mt-48 md:shadow-md md:rounded-lg md:sticky md:top-20">
      <div className="flex justify-center">
        <div className="flex flex-col items-center ">
          <h2 className="text-primary text-center text-xl mb-4 md:text-3xl bg-violet w-auto rounded-sm ">
            {groupId
              ? groupList
                  .filter((group) => group.id === groupId)
                  .map((group) => group.group_name)
              : "Mes Groupes"}
          </h2>
          <h2 className="text-primary text-center text-xl mb-4 md:text-3xl ">
            {categoryId > 0 &&
              categoryList
                .filter((category) => category.id === categoryId)
                .map((category) => category.category_name)}
          </h2>
        </div>
        {groupId > 0 && (
          <button type="button" onClick={() => backToZero()}>
            <img
              src={croix}
              alt="croix rouge pour effacer"
              className={
                groupId > 0 && categoryId === 0
                  ? "h-6 w-6 md:h-8 md:w-8 ml-4 mb-8"
                  : "h-6 w-6 md:h-8 md:w-8 ml-4 mb-14"
              }
            />
          </button>
        )}
      </div>

      <Swiper
        className={
          !groupId
            ? "h-36 md:w-[475px]  md:hidden"
            : "h-20 md:w-[475px]  md:hidden"
        }
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={2.5}
        pagination={{ clickable: true }}
      >
        {!groupId ? (
          <>
            {groupList.map((group) => (
              <SwiperSlide
                key={group.id}
                className="group-card flex bg-cover justify-center items-center align-middle text-center cursor-pointer"
                onClick={() => handleGroup(group.id)}
                style={{
                  backgroundImage: `url(${backEnd}/uploads/${group.image})`,
                }}
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
                  className="md:hidden group-card flex bg-cover justify-center items-center align-middle text-center cursor-pointer"
                  onClick={() => handleCategory(category.id)}
                  style={{
                    backgroundImage: `url(${backEnd}/uploads/${category.image})`,
                  }}
                >
                  <p className="text-primary font-bold bg-white opacity-70 h-1/3 w-11/12 flex justify-center items-center rounded">
                    {category.category_name}
                  </p>
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>

      {/* pour version Desktop */}
      {!groupId ? (
        <div className="bg-alert">
          <div className=" hidden md:block ">
            {groupList.map((group) => {
              return (
                <button
                  onClick={() => handleGroup(group.id)}
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
      ) : (
        <div className="bg-alert">
          <div className="hidden md:block">
            {categoryList
              .filter((category) => category.group_id === groupId)
              .map((category) => (
                <button
                  onClick={() => handleCategory(category.id)}
                  type="button"
                  className=" md:flex md:flex-col md:text-xl mb:border-b md:border md:p-3 md:mb-3 md:text-center md:mx-auto "
                  key={category.id}
                >
                  {category.category_name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrousel;

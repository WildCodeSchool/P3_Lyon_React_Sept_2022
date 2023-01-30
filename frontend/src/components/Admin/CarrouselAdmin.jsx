import React from "react";
import DropDownGroup from "./DropDownGroup";
import DropDownCategory from "./DropDownCategory";
import { usePostUserContext } from "../../contexts/PostUserContext";
import croix from "../../assets/close-red.png";

function CarrouselAdmin({ groupId, setGroupId, categoryId, setCategoryId }) {
  const { groupList, categoryList } = usePostUserContext();

  const backToZero = () => {
    setGroupId(0);
    setCategoryId(0);
  };

  return (
    <div>
      <div className="font-[Enedis] text-primary text-center text-4xl">
        <h3>Gérer la liste des publications</h3>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center ">
          <h2 className="text-primary text-center text-xl mb-4 md:text-3xl bg-violet w-auto rounded-sm ">
            {groupId > 0 &&
              groupList
                .filter((group) => group.id === groupId)
                .map((group) => group.group_name)}
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

      <div className=" flex justify-around mt-3 ">
        <DropDownGroup setGroupId={setGroupId} />
        {groupId > 0 && (
          <DropDownCategory groupId={groupId} setCategoryId={setCategoryId} />
        )}
      </div>
    </div>
  );
}

export default CarrouselAdmin;

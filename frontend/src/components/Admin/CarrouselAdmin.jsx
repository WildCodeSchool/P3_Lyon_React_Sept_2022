import React from "react";
import DropDownGroup from "./DropDownGroup";
import DropDownCategory from "./DropDownCategory";
import { usePostUserContext } from "../../contexts/PostUserContext";

function CarrouselAdmin({ groupId, setGroupId, categoryId, setCategoryId }) {
  const { groupList, categoryList } = usePostUserContext();
  return (
    <div>
      <div className="font-[Enedis] text-primary text-center text-4xl">
        <h3>Gérer la liste des publications</h3>
      </div>
      <h2 className="text-primary text-center text-xl mb-4 md:text-3xl">
        {groupId > 0 &&
          groupList
            .filter((group) => group.id === groupId)
            .map((group) => `Groupe: ${group.group_name}`)}
        <br />
        {categoryId > 0 &&
          categoryList
            .filter((category) => category.id === categoryId)
            .map((category) => `Catégorie: ${category.category_name}`)}
      </h2>

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

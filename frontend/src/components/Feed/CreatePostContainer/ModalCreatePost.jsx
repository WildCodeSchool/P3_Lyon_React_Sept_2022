import { useState } from "react";
import { usePostUserContext } from "../../../contexts/PostUserContext";

function ModalCreatePost({ showCategories, setShowCategories }) {
  const {
    groupList,
    categoryList,
    setValueSelectedCategory,
    setValueSelectedGroup,
  } = usePostUserContext();

  // function pour récuperer la valeur inscrit dans le input et
  // la transférer à filterSearch pour filter par nom de groupe
  const [filterSearch, setFilterSearch] = useState("");

  function handleSearch(e) {
    setFilterSearch(e.target.value);
  }

  function handleValue(category) {
    setValueSelectedCategory(category);
    setShowCategories(!showCategories);
  }
  return (
    <div>
      <div className="fixed top-0 overflow-y-scroll bg-white w-[101%] h-[100vh] md:w-1/2 md:ml-[50%] md:mt-2 ">
        <button
          type="button"
          onClick={() => setShowCategories(!showCategories)}
        >
          <img
            className="mt-2 ml-2 md:mt-6 md:ml-4"
            src="../src/assets/croix.png"
            alt="Close"
          />
        </button>
        <h1 className="text-[32px] px-6 text-primary font-bold text-center ">
          Choisir un groupe et une catégorie
        </h1>
        <div className=" w-full">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cherchez un groupe..."
            className="border rounded-xl border-primary mx-auto w-[280px] h-11 mt-10 mb-3 ml-16 pl-4"
          />
        </div>
        <div className="w-full mt-4 md:flex md:justify-around md:wrap">
          <div className="flex flex-col w-full ">
            {groupList
              .filter((group) => {
                return group.group_name
                  .toLowerCase()
                  .includes(filterSearch.toLowerCase());
              })
              .map((group) => (
                <button
                  type="button"
                  onClick={() => setValueSelectedGroup(group.group_name)}
                  className="text-lg px-10 font-normal bg-[#EBF2FB] text-primary pt-5 shadow-md shadow-slate-500"
                  value={group.group_name}
                  key={group.id}
                >
                  <span className="text-xl font-bold hover:bg-primary hover:text-white">
                    {group.group_name}
                  </span>

                  {categoryList
                    .filter((category) => category.group_id === group.id)
                    .map((category) => (
                      <button
                        type="button"
                        key={category.id}
                        value={category.id}
                        name={category.name}
                        className="cursor-pointer flex flex-col mt-3 h-10"
                        onClick={() => handleValue(category)}
                      >
                        <span className="hover:bg-violet hover:text-primary active:bg-violet active:text-primary">
                          {category.category_name}
                        </span>
                      </button>
                    ))}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreatePost;

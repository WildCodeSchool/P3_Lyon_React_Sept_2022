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
      <div className="fixed top-0 overflow-y-scroll bg-white w-screen h-screen">
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
        <h1 className="text-[32px] px-6 text-primary font-bold text-center md:text-4xl">
          Choisir une catégorie
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cherchez un groupe..."
            className="border rounded-xl border-primary mx-auto w-[280px] md:w-1/2 h-11 mt-10 mb-3 pl-4"
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
                <ul
                  role="menu"
                  aria-hidden
                  onClick={() => setValueSelectedGroup(group.group_name)}
                  className="text-lg px-10 font-normal pt-5 shadow-md shadow-slate-200"
                  value={group.group_name}
                  key={group.id}
                >
                  <span className="text-xl md:text-2xl font-bold bg-[#EBF2FB] text-primary ">
                    {group.group_name}
                  </span>

                  {categoryList
                    .filter((category) => category.group_id === group.id)
                    .map((category) => (
                      <li
                        role="menuitem"
                        aria-hidden
                        key={category.id}
                        value={category.id}
                        name={category.name}
                        className="cursor-pointer flex flex-col mt-3 h-10"
                        onClick={() => handleValue(category)}
                      >
                        <span className="w-fit md:text-xl hover:bg-violet hover:text-primary active:bg-violet active:text-primary">
                          {category.category_name}
                        </span>
                      </li>
                    ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreatePost;

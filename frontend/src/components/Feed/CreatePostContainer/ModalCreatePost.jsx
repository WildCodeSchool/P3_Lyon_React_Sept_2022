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
      <div className="fixed top-0 bg-white w-[101%] h-[100vh] md:w-1/2 md:ml-[50%] md:mt-2 ">
        <h1 className="text-[32px] text-primary font-bold text-center ">
          Choisir un groupe et une catégorie
        </h1>
        <div className=" w-full">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Cherchez un groupe..."
            className="border rounded-xl border-primary mx-auto w-[280px] h-11 my-10 ml-16 pl-4"
          />
        </div>
        <div className="w-full mt-4 md:flex md:justify-around md:wrap">
          <div className=" inline-block relative w-full ">
            <ul>
              {groupList.map((group) => (
                <button
                  type="button"
                  onClick={() => setValueSelectedGroup(group.group_name)}
                  className="text-lg px-10 font-normal text-primary pt-5 shadow-md"
                  value={group.group_name}
                  key={group.id}
                >
                  {group.group_name}
                  <ul>
                    {categoryList
                      .filter((category) => category.group_id === group.id)
                      .filter((category) => {
                        return category.category_name
                          .toLowerCase()
                          .includes(filterSearch.toLowerCase());
                      })
                      .map((category) => (
                        <button type="button" key={category.id}>
                          <button
                            type="button"
                            arial-hidden
                            value={category.id}
                            name={category.name}
                            className="cursor-pointer h-10  hover:bg-violet"
                            onClick={() => handleValue(category)}
                          >
                            {category.category_name}
                          </button>
                        </button>
                      ))}
                  </ul>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreatePost;

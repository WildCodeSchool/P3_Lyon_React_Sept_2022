import { Link } from "react-router-dom";
import DropDownGroup from "./DropDownGroup";
import DropDownCategory from "./DropDownCategory";
import { usePostUserContext } from "../../contexts/PostUserContext";

function HeaderAdmin({ groupId, setGroupId, categoryId, setCategoryId }) {
  const { groupList, categoryList } = usePostUserContext();
  return (
    <div className="flex-col justify-around">
      <h2 className="font-[Enedis] text-[#95CD31] font-bold text-center text-4xl">
        Espace admin
      </h2>
      <div className="flex justify-around mt-8">
        <Link to="/admin">
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mb-6 mt-6 border-primary rounded-2xl "
          >
            Publications
          </button>
        </Link>
        <Link to="/adminUser">
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
          >
            Utilisateurs
          </button>
        </Link>
        <button
          type="button"
          className="text-white font-[Enedis] bg-primary w-34 text-l w-[26vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
        >
          Espaces
        </button>
      </div>
      <div className="font-[Enedis] text-primary text-center text-2xl mb-6">
        <h3>Gérer la liste des publications</h3>
      </div>

      <div className=" flex justify-around mt-6 ">
        <DropDownGroup setGroupId={setGroupId} />
        {groupId > 0 && (
          <DropDownCategory groupId={groupId} setCategoryId={setCategoryId} />
        )}
      </div>
      <h2 className="text-primary text-center text-xl mb-4 md:text-3xl">
        {groupId
          ? groupList
              .filter((group) => group.id === groupId)
              .map((group) => `Groupe: ${group.group_name}`)
          : "Mes Groupes"}
        <br />
        {categoryId > 0 &&
          categoryList
            .filter((category) => category.id === categoryId)
            .map((category) => `Catégorie: ${category.category_name}`)}
      </h2>
    </div>
  );
}

export default HeaderAdmin;

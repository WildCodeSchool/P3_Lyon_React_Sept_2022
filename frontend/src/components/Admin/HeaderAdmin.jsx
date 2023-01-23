import { Link } from "react-router-dom";
import DropDownGroup from "./DropDownGroup";
import DropDownCategory from "./DropDownCategory";

function HeaderAdmin() {
  return (
    <div className="flex-col justify-around">
      <h2 className="font-[Enedis] text-[#95CD31] font-bold text-center text-4xl">
        Espace admin
      </h2>
      <div className="flex justify-around mt-8">
        <button
          type="button"
          className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mb-6 mt-6 border-primary rounded-2xl "
        >
          Publications
        </button>
        <Link to="/adminUser">
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
          >
            Utilisatieurs
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
        <DropDownGroup />
        <DropDownCategory />
      </div>
    </div>
  );
}

export default HeaderAdmin;

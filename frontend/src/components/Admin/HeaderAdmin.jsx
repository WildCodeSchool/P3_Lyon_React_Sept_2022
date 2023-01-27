import { Link } from "react-router-dom";

function HeaderAdmin() {
  return (
    <div className="flex-col justify-around">
      <h2 className="font-[Enedis] text-[#95CD31] font-bold text-center text-4xl">
        Espace admin
      </h2>
      <div className="flex justify-around mt-8">
        <Link to="/feed">
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
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[28vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl"
          >
            Utilisateurs
          </button>
        </Link>
        <Link to="/adminEspace">
          <button
            type="button"
            className="text-white font-[Enedis] bg-primary w-34 text-l w-[26vw]	font-bold border p-2 mt-6 mb-6 border-primary rounded-2xl "
          >
            Espaces
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderAdmin;

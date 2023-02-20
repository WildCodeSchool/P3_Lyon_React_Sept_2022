import { Link } from "react-router-dom";

function HeaderAdmin() {
  return (
    <div className="flex-col justify-around bg-[#070D4F] py-5 md:pb-5">
      <h2 className="font-[Enedis] text-white font-bold text-center text-4xl md:text-5xl md:pt-10">
        Espace admin
      </h2>
      <div className="flex justify-around xl:justify-evenly mt-8">
        <Link to="/feed">
          <button
            type="button"
            className="text-[#070D4F] font-[Enedis] bg-violet hover:bg-[#F6F6FD] hover:text-primary hover:border-primary hover:border text-lg md:text-xl w-[30vw] xl:w-72 font-bold p-2 md:p-3 mb-6 mt-6 rounded-2xl "
          >
            Publications
          </button>
        </Link>
        <Link to="/adminUser">
          <button
            type="button"
            className="text-[#070D4F] font-[Enedis] bg-violet hover:bg-[#F6F6FD] hover:text-primary hover:border-primary hover:border text-lg md:text-xl w-[28vw] xl:w-72 font-bold p-2 md:p-3 mt-6 mb-6 rounded-2xl"
          >
            Utilisateurs
          </button>
        </Link>
        <Link to="/adminEspace">
          <button
            type="button"
            className="text-[#070D4F] font-[Enedis] bg-violet hover:bg-[#F6F6FD] hover:text-primary hover:border-primary hover:border text-lg md:text-xl w-[28vw] xl:w-72 font-bold p-2 md:p-3 mt-6 mb-6 rounded-2xl "
          >
            Espaces
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderAdmin;

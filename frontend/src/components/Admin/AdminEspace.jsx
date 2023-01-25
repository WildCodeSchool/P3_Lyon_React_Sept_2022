import React from "react";
import Navbar from "../Navbar/Navbar";
import HeaderAdmin from "./HeaderAdmin";

function AdminEspace() {
  return (
    <div>
      <Navbar />
      <HeaderAdmin />
      <div className="font-[Enedis] text-primary text-center text-4xl mb-10 border-black">
        <h3>Gérer les groupes et les catégories</h3>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          type="button"
          className="w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
        >
          Ajouter un nouveau groupe
        </button>
        <button
          type="button"
          className="w-[74vw] h-18 items-center text-primary font-[Enedis] bg-white text-xl font-bold border p-3 px-8 mb-10 border-primary shadow-sm"
        >
          Ajouter un nouvelle catégorie
        </button>
      </div>
    </div>
  );
}

export default AdminEspace;

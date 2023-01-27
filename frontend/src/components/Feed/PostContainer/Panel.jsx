import React from "react";

function Panel() {
  return (
    <div className="hidden w-0 md:block md:h-[450px] md:bg-primary md:w-80 md:mt-48 md:shadow-md md:rounded-lg md:sticky md:top-20">
      <h2 className="w-0 md:w-auto md:text-white md:text-center md:mb-4 md:text-3xl md:mt-10">
        Actualités
      </h2>
      <ul>
        <li className="md:text-2xl md:text-white md:text-center md:mt-2 ">
          Lyon
        </li>
        <li className="md:text-2xl md:text-white md:text-center md:mt-2 ">
          Bordeaux
        </li>
        <li className="md:text-2xl md:text-white md:text-center md:mt-2 ">
          Lille
        </li>
        <li className="md:text-2xl md:text-white md:text-center md:mt-2 ">
          Marseille
        </li>
        <li className="md:text-2xl md:text-white md:text-center md:mt-2 ">
          Paris
        </li>
      </ul>
    </div>
  );
}

export default Panel;

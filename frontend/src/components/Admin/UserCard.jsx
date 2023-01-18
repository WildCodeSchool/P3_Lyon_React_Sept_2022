/* eslint-disable react/prop-types */
import DropDownEditUser from "./DropDownEditUser";

// eslint-disable-next-line react/prop-types
export default function UserCard({ card, toggleRefresh }) {
  return (
    <div>
      <div className="flex font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6">
        <img
          className="rounded-full w-16 mr-6 border-4 border-violet"
          src={card.avatar}
          alt="User avatar"
        />
        <div>
          <p className="font-bold">
            {card.firstname} {card.lastname}
          </p>
          <p className="italic">'{card.role}'</p>
        </div>
        <DropDownEditUser card={card} toggleRefresh={toggleRefresh} />
      </div>
    </div>
  );
}

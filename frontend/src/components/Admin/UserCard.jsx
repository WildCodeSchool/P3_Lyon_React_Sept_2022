import DropDownEditUser from "./DropDownEditUser";

export default function UserCard({
  card,
  toggleRefresh,
  deleteButton,
  deleteUserGroup,
}) {
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
        <DropDownEditUser
          card={card}
          toggleRefresh={toggleRefresh}
          deleteUserGroup={deleteUserGroup}
          deleteButton={deleteButton}
        />
      </div>
    </div>
  );
}

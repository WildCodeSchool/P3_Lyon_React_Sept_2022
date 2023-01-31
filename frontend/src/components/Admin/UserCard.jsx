import DropDownEditUser from "./DropDownEditUser";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function UserCard({
  card,
  toggleRefresh,
  deleteButton,
  deleteUserGroup,
  addUserInGroup,
  addUserGroupButton,
  groupId,
}) {
  return (
    <div>
      <div className="flex justify-start font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6">
        <img
          className="rounded-full w-[21vw] h-[22vw] border-4 border-violet"
          src={`${backEnd}/uploads/${card.avatar}`}
          alt="User avatar"
        />
        <div>
          <p className="font-bold w-28 pl-6">
            {card.firstname} {card.lastname}
          </p>
          <p className="italic">'{card.role}'</p>
          <p>{JSON.stringify(groupId)}</p>
        </div>
        <DropDownEditUser
          card={card}
          toggleRefresh={toggleRefresh}
          deleteUserGroup={deleteUserGroup}
          deleteButton={deleteButton}
          addUserInGroup={addUserInGroup}
          addUserGroupButton={addUserGroupButton}
          groupId={groupId}
        />
      </div>
    </div>
  );
}

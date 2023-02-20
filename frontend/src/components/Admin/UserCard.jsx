import DropDownEditUser from "./DropDownEditUser";
import defaultAvatar from "../../assets/photo-avatar-profil.png";

const backEnd = import.meta.env.VITE_BACKEND_URL;

export default function UserCard({
  card,
  toggleRefresh,
  deleteButton,
  deleteUserGroup,
  addUserInGroup,
  addUserGroupButton,
  groupId,
  deleteUserList,
}) {
  return (
    <div>
      <div className="flex justify-start font-[Enedis] text-primary rounded-3xl bg-white m-4 p-6 md:mx-28">
        {card.avatar ? (
          <img
            className="rounded-full object-cover w-24 h-24 border-4 border-violet"
            src={`${backEnd}/uploads/${card.avatar}`}
            alt="User avatar"
          />
        ) : (
          <img
            className="rounded-full object-cover w-24 h-24 border-4 border-violet"
            src={defaultAvatar}
            alt="User avatar"
          />
        )}
        <div className="w-full">
          <p className="font-bold pl-6">
            {card.firstname} {card.lastname}
          </p>
          <p className="w-full italic pl-6">'{card.role}'</p>
        </div>
        <DropDownEditUser
          card={card}
          toggleRefresh={toggleRefresh}
          deleteUserGroup={deleteUserGroup}
          deleteButton={deleteButton}
          addUserInGroup={addUserInGroup}
          addUserGroupButton={addUserGroupButton}
          groupId={groupId}
          deleteUserList={deleteUserList}
        />
      </div>
    </div>
  );
}

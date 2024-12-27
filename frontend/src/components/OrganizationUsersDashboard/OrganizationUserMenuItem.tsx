import { FC } from "react";
import { User } from "../../redux/user/user.types";
import { useDrag } from "react-dnd";
import { MenuItem } from "../Menu/MenuItem";

export const OrganizationUserMenuItem: FC<{ user: User }> = ({ user }) => {
  const [collected, drag, dragPreview] = useDrag<
    { id: string },
    void,
    { isDragging: boolean }
  >(() => ({
    type: "user",
    item: { id: user.id },
  }));

  if (collected.isDragging) {
    return <div ref={dragPreview} {...collected} />;
  }

  return (
    <MenuItem
      className="flex items-center justify-between px-2 py-1 hover:bg-gray-100"
      ref={drag}
      {...collected}
    >
      <div className="flex items-center truncate">
        <div className="mr-2 w-6 h-6 bg-gray-300 rounded-full" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold truncate">{user.name}</span>
          <span className="text-xs text-gray-500 truncate">{user.email}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500">{user.role.name}</div>
    </MenuItem>
  );
};

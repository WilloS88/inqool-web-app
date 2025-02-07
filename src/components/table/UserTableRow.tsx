import { useState, useContext } from "react";
import { DataContext } from "../DataContext";
import { EditEntityModal } from "../modal/EditEntityModal";
import { Button } from "../ui/Button";
import {
  User as UserIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
  ShieldBan as ShieldBanIcon,
  ShieldCheck as ShieldCheckIcon,
  ToggleLeft as ToggleBannedIcon,
} from "lucide-react";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import type { User } from "../../types/User";

export const UserTableRow = ({ item }: { item: User }) => {
  const data = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingAction, setLoadingAction] = useState<"ban" | "delete" | null>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);

  if (!data) return null;
  const { fetchUsers } = data;

  const handleDelete = async () => {
    if (!window.confirm(`Do you want to really delete ${item.name}?`)) return;
    setLoadingAction("delete");
    setIsFetching(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/${item.id}`,
      );
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoadingAction(null);
      setIsFetching(false);
    }
  };

  const handleToggleBanned = async () => {
    setLoadingAction("ban");
    setIsFetching(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${item.id}`,
        {
          banned: !item.banned,
        },
      );
      await fetchUsers();
    } catch (error) {
      console.error("Error toggling banned status:", error);
    } finally {
      setLoadingAction(null);
      setIsFetching(false);
    }
  };

  return (
    <>
      <tr>
        <td className="px-6 whitespace-nowrap">
          <UserIcon />
        </td>
        <td className="min-w-xs px-6 py-4 whitespace-nowrap">
          {item.name ? item.name : "Unknown"}
        </td>
        <td className="max-w-sm px-6 py-4 whitespace-nowrap">{item.gender}</td>
        <td className="max-w-sm px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            {loadingAction === "ban" || isFetching ? (
              <FadeLoader
                color="#3498db"
                height={15}
                width={5}
                radius={40}
                margin={1}
                className="h-[50px] w-[50px]"
              />
            ) : (
              <>
                {item.banned ? (
                  <ShieldBanIcon className="text-red-500" />
                ) : (
                  <ShieldCheckIcon className="text-green-500" />
                )}
                {item.banned ? "Banned" : "Active"}
              </>
            )}
          </div>
        </td>
        <td className="flex gap-2 px-6 py-4 whitespace-nowrap">
          {loadingAction === "delete" || isFetching ? (
            <FadeLoader
              color="#e74c3c"
              height={15}
              width={5}
              radius={40}
              margin={1}
            />
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
                icon={<EditIcon />}
              />
              <Button
                onClick={handleToggleBanned}
                className="bg-blue-500 text-white hover:bg-blue-600"
                icon={<ToggleBannedIcon />}
              />
              <Button
                onClick={handleDelete}
                className="bg-red-500 text-white hover:bg-red-700"
                icon={<DeleteIcon />}
              />
            </>
          )}
        </td>
      </tr>
      {isEditing && (
        <tr>
          <td colSpan={5}>
            <EditEntityModal
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              entity={item}
              endpoint="users"
              onSuccess={fetchUsers}
            />
          </td>
        </tr>
      )}
    </>
  );
};

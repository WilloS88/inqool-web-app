import { Card } from "../ui/Card";
import {
  User as UserIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import type { User } from "../../types/User";
import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { EditEntityModal } from "../modal/EditEntityModal";

export const UserCard = ({ item }: { item: User }) => {
  const data = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!data) return null;

  const { fetchUsers } = data;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/${item.id}`,
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Card>
        <div className="px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-2xl font-bold">
            {item.name ? item.name : "Unknown"}
            <div className="mt-2 ml-2 flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex cursor-pointer items-center gap-1 rounded bg-yellow-500 px-2 py-1 text-white duration-150 hover:bg-yellow-600"
              >
                <EditIcon />
              </button>
              <button
                onClick={handleDelete}
                className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2 py-1 text-white duration-150 hover:bg-red-600"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <p className="text-base text-gray-700">Gender: {item.gender}</p>
          <div className="flex justify-between text-gray-600">
            Banned:{" "}
            {item.banned !== undefined
              ? item.banned
                ? "Yes"
                : "No"
              : "Unknown"}
            <UserIcon />
          </div>
        </div>
      </Card>

      {isEditing && (
        <EditEntityModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          entity={item}
          endpoint="users"
          onSuccess={fetchUsers}
        />
      )}
    </>
  );
};

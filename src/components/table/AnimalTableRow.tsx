import { useState, useContext } from "react";
import { DataContext } from "../DataContext";
import { EditEntityModal } from "../modal/EditEntityModal";
import { Button } from "../ui/Button";
import {
  Dog as DogIcon,
  Cat as CatIcon,
  Shell as ShellIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import axios from "axios";
import type { Animal } from "../../types/Animal";

export const AnimalTableRow = ({ item }: { item: Animal }) => {
  const data = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!data) return null;
  const { fetchAnimals } = data;

  const handleDelete = async () => {
    if (!window.confirm(`Do you want to really delete ${item.name}?`)) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/animals/${item.id}`,
      );
      fetchAnimals();
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  };

  return (
    <>
      <tr>
        <td className="px-6 whitespace-nowrap">
          {item.type === "cat" ? (
            <CatIcon />
          ) : item.type === "dog" ? (
            <DogIcon />
          ) : (
            <ShellIcon />
          )}
        </td>
        <td className="min-w-xs px-6 whitespace-nowrap">{item.name}</td>
        <td className="px-6 whitespace-nowrap">
          {item.type === "cat" ? (
            <>Cat</>
          ) : item.type === "dog" ? (
            <>Dog</>
          ) : (
            <>Other</>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{item.age} years</td>
        <td className="flex px-6 py-4 whitespace-nowrap">
          <Button
            onClick={() => setIsEditing(true)}
            className="mr-2 bg-yellow-500 text-white duration-150 hover:bg-yellow-600"
            icon={<EditIcon />}
          />
          <Button
            onClick={handleDelete}
            className="bg-red-500 text-white duration-150 hover:bg-red-800"
            icon={<DeleteIcon />}
          />
        </td>
      </tr>
      {isEditing && (
        <tr>
          <td colSpan={4}>
            <EditEntityModal
              isOpen={isEditing}
              onClose={() => setIsEditing(false)}
              entity={item}
              endpoint="animals"
              onSuccess={fetchAnimals}
            />
          </td>
        </tr>
      )}
    </>
  );
};

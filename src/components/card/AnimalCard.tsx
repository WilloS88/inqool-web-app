import { Card } from "../ui/Card";
import {
  Dog as DogIcon,
  Cat as CatIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import type { Animal } from "../../types/Animal";
import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { EditEntityModal } from "../modal/EditEntityModal";

export const AnimalCard = ({ item }: { item: Animal }) => {
  const data = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!data) return null;

  const { fetchAnimals } = data;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${item.name}?`))
      return;

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
      <Card>
        <div className="px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-2xl font-bold">
            {item.name}
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
          <p className="text-gray-600">Type: {item.type}</p>
          <div className="flex justify-between gap-2 text-gray-600">
            Age: {item.age} years
            {item.type === "cat" ? (
              <CatIcon />
            ) : item.type === "dog" ? (
              <DogIcon />
            ) : (
              <span className="text-lg font-bold">?</span>
            )}
          </div>
        </div>
      </Card>

      {isEditing && (
        <EditEntityModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          entity={item}
          endpoint="animals"
          onSuccess={fetchAnimals}
        />
      )}
    </>
  );
};

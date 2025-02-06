import { Card } from "../ui/Card";
import {
  Dog as DogIcon,
  Cat as CatIcon,
  Edit as EditIcon,
  Trash2 as DeleteIcon,
} from "lucide-react";
import type { Animal } from "../../types/Animal";

export const AnimalCard = ({ item }: { item: Animal }) => {
  return (
    <Card>
      <div className="px-6 py-4">
        <div className="mb-2 flex items-center justify-between text-2xl font-bold">
          {item.name}
          <div className="mt-2 ml-2 flex gap-2">
            <button className="flex cursor-pointer items-centers gap-1 rounded bg-yellow-500 px-2 py-1 text-white duration-150 hover:bg-yellow-600">
              <EditIcon />
            </button>
            <button className="flex cursor-pointer items-center gap-1 rounded bg-red-500 px-2 py-1 text-white duration-150 hover:bg-red-600">
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
  );
};

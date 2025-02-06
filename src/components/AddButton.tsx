import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/Button";
import { PlusCircle } from "lucide-react";
import { AddEntityModal } from "./modal/AddEntityModal";
import { useContext } from "react";
import { DataContext } from "./DataContext";

export const AddButton = () => {
  const location = useLocation();
  const data = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  const isUsersPage = location.pathname.includes("users");
  const endpoint = isUsersPage ? "users" : "animals";
  const fetchData = isUsersPage ? data.fetchUsers : data.fetchAnimals;

  return (
    <>
      <Button
        label={`Add ${isUsersPage ? "User" : "Animal"}`}
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white duration-200 hover:bg-green-600"
        icon={<PlusCircle />}
      />

      {isModalOpen && (
        <AddEntityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          entityType={endpoint}
          onSuccess={fetchData}
        />
      )}
    </>
  );
};

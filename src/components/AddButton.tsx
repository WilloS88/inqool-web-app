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
        className="hover:bg-green-700 hover:shadow-green-600 rounded-lg bg-green-600 px-8 py-3 text-lg font-bold tracking-wide text-white shadow-lg shadow-green-600/20 transition duration-300 hover:text-white sm:px-9 sm:py-4 sm:text-xl"
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

import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { EntityList } from "../components/EntityList";
import { UserCard } from "../components/card/UserCard";
import { AddButton } from "../components/AddButton";

export const UsersPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-center">
        <AddButton />
      </div>
      <EntityList title="Users" items={data.users} CardComponent={UserCard} />
    </div>
  );
};

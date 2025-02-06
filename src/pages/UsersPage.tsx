import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { EntityList } from "../components/EntityList";
import { UserCard } from "../components/card/UserCard";

export const UsersPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <EntityList title="Users" items={data.users} CardComponent={UserCard} />
  );
};

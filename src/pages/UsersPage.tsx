import { useContext } from "react";
import { DataContext } from "../components/DataContext";

export const UsersPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  const { users } = data;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.gender}) {user.banned ? "Banned" : "Active"}
          </li>
        ))}
      </ul>
    </div>
  );
};

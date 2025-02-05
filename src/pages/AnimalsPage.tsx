import { useContext } from "react";
import { DataContext } from "../components/DataContext";

export const AnimalsPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  const { animals } = data;

  return (
    <div>
      <h2>Animals</h2>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            {animal.name} ({animal.type}, {animal.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { EntityList } from "../components/EntityList";
import { AnimalCard } from "../components/card/AnimalCard";

export const AnimalsPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <EntityList
      title="Animals"
      items={data.animals}
      CardComponent={AnimalCard}
    />
  );
};

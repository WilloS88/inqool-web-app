import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { EntityList } from "../components/EntityList";
import { AnimalCard } from "../components/card/AnimalCard";
import { AddButton } from "../components/AddButton";

export const AnimalsPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-center">
        <AddButton />
      </div>
      <EntityList
        title="Animals"
        items={data.animals}
        CardComponent={AnimalCard}
      />
    </div>
  );
};

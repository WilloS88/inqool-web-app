import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { TableList } from "../components/TableList";
import { AnimalTableRow } from "../components/table/AnimalTableRow";
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
      <TableList
        title="Animals"
        items={data.animals}
        headers={["Icon", "Name", "Type", "Age", "Actions"]}
        TableRowComponent={AnimalTableRow}
      />
    </div>
  );
};

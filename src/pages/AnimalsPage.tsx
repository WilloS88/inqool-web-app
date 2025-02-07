import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { AnimalTableRow } from "../components/table/AnimalTableRow";
import { TableList } from "../components/table/TableList";

export const AnimalsPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <div className="mt-5">
      <TableList
        title="Animals"
        items={data.animals}
        headers={["Icon", "Name", "Type", "Age", "Actions"]}
        TableRowComponent={AnimalTableRow}
      />
    </div>
  );
};

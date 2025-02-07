import { useState, useEffect, useContext } from "react";
import { DataContext } from "../components/DataContext";
import { TableList } from "../components/table/TableList";
import { UserTableRow } from "../components/table/UserTableRow";
import { AnimalTableRow } from "../components/table/AnimalTableRow";
import { Button } from "../components/ui/Button";

export const HomePage = () => {
  const data = useContext(DataContext);
  const [showEntities, setShowEntities] = useState(
    () => JSON.parse(localStorage.getItem("showEntities") || "false"),
  );

  useEffect(() => {
    localStorage.setItem("showEntities", JSON.stringify(showEntities));
  }, [showEntities]);

  if (!data) return <p>Error: Data context is not available.</p>;
  const { users, animals } = data;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-6 text-3xl font-bold">Welcome to Entity Management</h1>
      <Button
        onClick={() => setShowEntities((prev: boolean) => !prev)}
        label={showEntities ? "Hide All Entities" : "Show All Entities"}
        className={`px-4 py-2 text-white transition-colors ${
          showEntities
            ? "bg-fuchsia-500 hover:bg-fuchsia-700"
            : "bg-cyan-500 hover:bg-cyan-600"
        }`}
      />

      {showEntities && (
        <div className="mt-6 w-full max-w-6xl">
          <TableList
            title=""
            items={users}
            TableRowComponent={UserTableRow}
            headers={["Icon", "Name", "Gender", "Status", "Actions"]}
          />

          <TableList
            title=""
            items={animals}
            TableRowComponent={AnimalTableRow}
            headers={["Icon", "Name", "Type", "Age", "Actions"]}
          />
        </div>
      )}
    </div>
  );
};

import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { TableList } from "../components/TableList";
import { UserTableRow } from "../components/table/UserTableRow";
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
      <TableList
        title="Users"
        items={data.users}
        headers={["Icon","Name", "Gender", "Banned", "Actions"]}
        TableRowComponent={UserTableRow}
      />
    </div>
  );
};

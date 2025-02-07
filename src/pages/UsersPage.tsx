import { useContext } from "react";
import { DataContext } from "../components/DataContext";
import { UserTableRow } from "../components/table/UserTableRow";
import { TableList } from "../components/table/TableList";

export const UsersPage = () => {
  const data = useContext(DataContext);

  if (!data) {
    return <p>Error: Data context is not available.</p>;
  }

  return (
    <div className="mt-5">
      <TableList
        title="Users"
        items={data.users}
        headers={["Icon", "Name", "Gender", "Banned", "Actions"]}
        TableRowComponent={UserTableRow}
      />
    </div>
  );
};

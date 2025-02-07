import { useState } from "react";
import { FilterSection } from "../FilterSection";
import { BarLoader } from "react-spinners";

type TableListProps<T> = {
  title: string;
  items: T[];
  TableRowComponent: React.ComponentType<{ item: T }>;
  headers: string[];
  itemsPerPage?: number;
};

export const TableList = <T extends { id: string; name: string }>({
  title,
  items,
  TableRowComponent,
  headers,
  itemsPerPage = 10,
}: TableListProps<T>) => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="mb-2 flex justify-center p-4">
      <div className="flex w-full max-w-5xl flex-col">
        <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>

        <div className="flex justify-center">
          <FilterSection
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>

        {items.length === 0 ? (
          <div className="flex justify-center py-10">
            <BarLoader color="#3498db" width={200} />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedItems.map((item) => (
                <TableRowComponent key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        )}

        {totalPages > 1 && (
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredItems.length)}
                </span>{" "}
                of <span className="font-medium">{filteredItems.length}</span>{" "}
                results
              </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-none ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-none ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

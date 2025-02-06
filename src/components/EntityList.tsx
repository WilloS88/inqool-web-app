import { useState } from "react";
import { FilterSection } from "../FilterSection";
import { Button } from "./ui/Button";

type EntityListProps<T> = {
  title: string;
  items: T[];
  CardComponent: React.ComponentType<{ item: T }>;
  itemsPerPage?: number;
};

export const EntityList = <T extends { id: string; name: string }>({
  title,
  items,
  CardComponent,
  itemsPerPage = 9,
}: EntityListProps<T>) => {
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
    <div className="flex max-h-screen justify-center p-4 mb-2">
      <div className="flex min-h-[calc(100vh-200px)] w-full max-w-5xl flex-col">
        <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>

        <div className="flex justify-center">
          <FilterSection
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {paginatedItems.map((item) => (
            <li key={item.id}>
              <CardComponent item={item} />
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="mt-auto flex justify-center gap-2">
            <Button
              label="Previous"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-gray-500 text-white hover:bg-gray-600"
              disabled={currentPage === 1}
            />
            <span className="rounded border border-gray-300 px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              label="Next"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="bg-gray-500 text-white hover:bg-gray-600"
              disabled={currentPage === totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

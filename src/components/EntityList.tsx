import { useState } from "react";
import { FilterSection } from "../FilterSection";

type EntityListProps<T> = {
  title: string;
  items: T[];
  CardComponent: React.ComponentType<{ item: T }>;
};

export const EntityList = <T extends { id: string; name: string }>({
  title,
  items,
  CardComponent,
}: EntityListProps<T>) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen justify-center p-4">
      <div className="w-full max-w-5xl">
        <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>
        <div className="flex justify-center">
          <FilterSection
            filterText={filterText}
            setFilterText={setFilterText}
          />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <li key={item.id}>
              <CardComponent item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

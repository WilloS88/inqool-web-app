import { Button } from "./ui/Button";
import { Search } from "lucide-react";

type FilterSectionProps = {
  filterText: string;
  setFilterText: (value: string) => void;
};

export const FilterSection = ({
  filterText,
  setFilterText,
}: FilterSectionProps) => {
  return (
    <div className="flex w-full max-w-lg gap-2 lg:max-w-xs">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="block w-full rounded-md border-0 bg-white py-2 pr-3 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
        />
      </div>
      <Button
        label="Clear"
        onClick={() => setFilterText("")}
        className="bg-red-500 py-1.5 text-white duration-150 hover:bg-red-800"
      />
    </div>
  );
};

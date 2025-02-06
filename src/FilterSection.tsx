import { Button } from "./components/ui/Button";

type FilterSectionProps = {
  filterText: string;
  setFilterText: (value: string) => void;
};

export const FilterSection = ({ filterText, setFilterText }: FilterSectionProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <Button
        label="Clear"
        onClick={() => setFilterText("")}
        className="bg-red-500 text-white hover:bg-red-700"
      />
    </div>
  );
};

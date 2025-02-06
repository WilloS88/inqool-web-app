type EntityListProps<T> = {
  title: string;
  items: T[];
  CardComponent: React.FC<{ item: T }>;
};

export const EntityList = <T,>({ title, items, CardComponent }: EntityListProps<T>) => {
  return (
    <div className="flex min-h-screen justify-center p-4">
      <div className="w-full max-w-5xl">
        <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <li key={index}>
              <CardComponent item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

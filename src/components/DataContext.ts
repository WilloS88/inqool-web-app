import { createContext } from "react";

type User = {
  id: string;
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
};

type Animal = {
  id: string;
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
};

export type DataContextType = {
  users: User[];
  animals: Animal[];
  fetchUsers: () => void;
  fetchAnimals: () => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

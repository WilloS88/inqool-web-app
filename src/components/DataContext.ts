import { createContext } from "react";
import type { User } from "../types/User";
import type { Animal } from "../types/Animal";

export type DataContextType = {
  users: User[];
  animals: Animal[];
  fetchUsers: () => void;
  fetchAnimals: () => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

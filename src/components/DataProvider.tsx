import { useEffect, useState, ReactNode } from "react";
import { DataContext, DataContextType } from "./DataContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [users, setUsers] = useState<DataContextType["users"]>([]);
  const [animals, setAnimals] = useState<DataContextType["animals"]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/animals`);
      setAnimals(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAnimals();
  }, []);

  return (
    <DataContext.Provider value={{ users, animals, fetchUsers, fetchAnimals }}>
      {children}
    </DataContext.Provider>
  );
};

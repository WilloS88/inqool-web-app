import { DataProvider } from "./components/DataProvider";
import { UsersPage } from "./pages/UsersPage";
import { AnimalsPage } from "./pages/AnimalsPage";
import "./index.css";

function App() {
  return (
    <DataProvider>
      <UsersPage />
      <AnimalsPage />
    </DataProvider>
  );
}

export default App;

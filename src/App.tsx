import { DataProvider } from "./components/DataProvider";
import { Navbar } from "./components/ui/Navbar";
import { Footer } from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <DataProvider>
        <main className="flex-grow">
          <Outlet />
        </main>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;

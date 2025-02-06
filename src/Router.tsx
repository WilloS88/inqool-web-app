import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { UsersPage } from "./pages/UsersPage";
import { AnimalsPage } from "./pages/AnimalsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "users", element: <UsersPage /> },
      { path: "animals", element: <AnimalsPage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
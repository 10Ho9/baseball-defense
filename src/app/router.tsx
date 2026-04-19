import { createBrowserRouter } from "react-router-dom";
import { CategoryScreen } from "../screens/CategoryScreen";
import { LibraryScreen } from "../screens/LibraryScreen";
import { TrainerScreen } from "../screens/TrainerScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LibraryScreen />,
  },
  {
    path: "/k/:categoryId",
    element: <CategoryScreen />,
  },
  {
    path: "/s/:scenarioId",
    element: <TrainerScreen />,
  },
]);

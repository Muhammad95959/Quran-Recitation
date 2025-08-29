import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reciter from "./Reciter.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/reciter/:id", element: <Reciter /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

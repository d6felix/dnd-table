import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.scss";
import { MainPage } from "./pages";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
	<StrictMode>
		<MainPage />
	</StrictMode>
);
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { MainPage } from "./pages";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
	<StrictMode>
		<DndProvider backend={HTML5Backend}>
			<MainPage />
		</DndProvider>
	</StrictMode>
);

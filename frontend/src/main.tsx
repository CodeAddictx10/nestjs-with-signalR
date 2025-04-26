import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignalR from "./SignalR.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SignalR />
    </StrictMode>,
);

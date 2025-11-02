import "reflect-metadata";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createApplication } from "./app/create-app";
import './index.css'

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite'
);

const App = createApplication();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

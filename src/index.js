import { createRoot } from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const root = createRoot(document.getElementById("root"));

root.render(<App />);

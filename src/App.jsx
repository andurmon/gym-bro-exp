import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./i18n.js";
import { Suspense } from "react";

function App() {
  const base = import.meta.env?.VITE_BASE_PATH ?? "HELLO";

  return (
    <Suspense fallback={<div>ALMOST THEREEEE</div>}>
      <BrowserRouter basename={base}>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

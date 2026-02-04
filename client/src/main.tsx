import { createRoot } from "react-dom/client";
import { StrictMode, useEffect, useRef } from "react";
import App from "./App";
import "./index.css";

// Wrap App to remove loader after first mount (StrictMode-safe)
function AppWithLoader() {
  const hasRemovedLoader = useRef(false);
  
  useEffect(() => {
    // Only remove once, even if effect runs twice in StrictMode
    if (!hasRemovedLoader.current) {
      hasRemovedLoader.current = true;
      const loader = document.getElementById("initial-loader");
      if (loader) {
        loader.remove();
      }
    }
  }, []);
  
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithLoader />
  </StrictMode>
);

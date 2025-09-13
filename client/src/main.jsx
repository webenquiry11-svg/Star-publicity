// In client/src/main.jsx
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "../src/app/store.js";
import { HelmetProvider } from 'react-helmet-async'; // Import

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider> {/* Wrap your App */}
      <App />
    </HelmetProvider>
  </Provider>
);
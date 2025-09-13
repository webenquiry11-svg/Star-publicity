import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "../src/app/store.js";
import { HelmetProvider } from 'react-helmet-async'; // 1. Import HelmetProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider> {/* 2. Nest the HelmetProvider here */}
      <App />
    </HelmetProvider>
  </Provider>
);
import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client, which is used for creating roots
import App from "./App.jsx"; // Import the main App component from App.jsx file
import "./index.css"; // Import CSS styles for the application

// Create a root using ReactDOM.createRoot method and render the App component into it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    {/* Enable React strict mode for the entire application */}
    <App /> {/* Render the App component */}
  </React.StrictMode>
);

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmationPage from "./pages/confirmation";
import DashboardPage from "./pages/dashboard";
import DentistPage from "./pages/dentist";
import Layout from "./pages/layout";

function App() {
  return (
    // BrowserRouter is used to provide routing functionality
    <BrowserRouter>
      {/* Routes component defines the routes of the application */}
      <Routes>
        {/* 
          Layout component wraps the entire application layout, including header and main content.
          All routes inside this layout will share the Layout component.
        */}
        <Route element={<Layout />}>
          {/* 
            Index route for DashboardPage, accessible via the root URL.
            Renders DashboardPage component inside Layout component.
          */}
          <Route index element={<DashboardPage />} />

          {/* 
            Route for DentistPage, accessible via /dentist path.
            Renders DentistPage component inside Layout component.
          */}
          <Route path="dentist" element={<DentistPage />} />

          {/* 
            Route for ConfirmationPage with dynamic parameter :id.
            Accessible via /confirmation/:id path, where :id can be any dynamic value.
            Renders ConfirmationPage component inside Layout component.
          */}
          <Route path="confirmation/:id" element={<ConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

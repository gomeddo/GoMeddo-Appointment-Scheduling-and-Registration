import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentPage from "./pages/appointment";
import ConfirmationPage from "./pages/confirmation";
import DashboardPage from "./pages/dashboard";
import Layout from "./pages/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="appointment/:id" element={<AppointmentPage />} />
          <Route path="confirmation/:id" element={<ConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import DentistPage from "./pages/dentist";
import ConfirmationPage from "./pages/confirmation";
import DashboardPage from "./pages/dashboard";
import Layout from "./pages/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dentist" element={<DentistPage />} />
          <Route path="confirmation/:id" element={<ConfirmationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

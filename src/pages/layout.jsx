import { Outlet } from "react-router-dom"; // Import Outlet component from react-router-dom for nested routing
import Header from "../components/header"; // Import Header component
import FilterProvider from "../sdk/filterContext"; // Import FilterProvider from SDK
import StateProvider from "../sdk/stateContext"; // Import StateProvider from SDK

export default function Layout() {
  return (
    <StateProvider>
      {" "}
      {/* Wrap the entire application state provider */}
      <FilterProvider>
        {" "}
        {/* Wrap the filter context provider */}
        <div className="flex flex-col h-screen w-screen overflow-hidden">
          {" "}
          {/* Main layout container */}
          <Header /> {/* Render Header component */}
          <div className="mx-8 px-8 py-6 xl:w-[1280px] xl:mx-auto h-full overflow-auto">
            {" "}
            {/* Content container with responsive styling */}
            <Outlet /> {/* Render nested routes within this component */}
          </div>
        </div>
      </FilterProvider>
    </StateProvider>
  );
}

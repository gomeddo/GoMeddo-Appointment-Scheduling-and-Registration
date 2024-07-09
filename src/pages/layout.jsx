import { Outlet } from "react-router-dom";
import Header from "../components/header";
import FilterProvider from "../sdk/filterContext";
import StateProvider from "../sdk/stateContext";

export default function Layout() {
  return (
    <StateProvider>
      <FilterProvider>
        <div className="flex flex-col h-screen w-screen overflow-hidden">
          <Header />
          <div className="mx-8 px-8 py-6 xl:w-[1280px] xl:mx-auto h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </FilterProvider>
    </StateProvider>
  );
}

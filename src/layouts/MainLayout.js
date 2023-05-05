import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { MovieProvider } from "../contexts/MovieContext";

function MainLayout() {
  return (
    <MovieProvider>
      <NavBar />
      <Outlet />
    </MovieProvider>
  );
}

export default MainLayout;

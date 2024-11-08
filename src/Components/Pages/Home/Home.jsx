import Navbar from "../../../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default Home;

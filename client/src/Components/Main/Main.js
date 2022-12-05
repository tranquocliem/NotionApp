import { useState } from "react";
import Sidebar from "../Menu/Sidebar";
import Navbar from "../Menu/Navbar";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";

function Main() {
  const [visible, setVisiblity] = useState(true);

  return (
    <div className="container-scroller">
      <Sidebar hide={visible} />
      <div className="container-fluid page-body-wrapper">
        <Navbar changeToggle={(data) => setVisiblity(!data)} />
        <div className="main-panel">
          <div className="content-wrapper">
            <Home />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

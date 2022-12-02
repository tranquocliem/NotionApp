import "./App.css";
import { useState } from "react";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Menu/Sidebar";
import Navbar from "./Components/Menu/Navbar";
import Login from "./Components/Login/Login";

function App() {
  const [visible, setVisiblity] = useState(true);
  return (
    <div className="App">
      <Login />
      {/* <div className="container-scroller">
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
      </div> */}
    </div>
  );
}

export default App;

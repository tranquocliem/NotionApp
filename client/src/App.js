import { useContext, useState, useEffect } from "react";
import "./App.css";
import DuongDanURL from "./Components/DuongDanURL/DuongDanURL";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Menu/Navbar";
import Sidebar from "./Components/Menu/Sidebar";
import { AuthContext } from "./Context/AuthContext";
import { getMyAccount } from "./Service/AccountService";

function App() {
  const [account, setAccount] = useState(null);
  const authContext = useContext(AuthContext);
  const [visible, setVisiblity] = useState(true);

  useEffect(() => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
    });
  }, []);
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Main /> */}
      {authContext.isAuthenticated ? (
        <div className="container-scroller">
          <Sidebar user={account} hide={visible} />
          <div className="container-fluid page-body-wrapper">
            <Navbar
              user={account}
              changeToggle={(data) => setVisiblity(!data)}
            />
            <div className="main-panel">
              <div className="content-wrapper">
                <DuongDanURL />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DuongDanURL />
      )}
    </div>
  );
}

export default App;

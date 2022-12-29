import { useContext, useState, useEffect } from "react";
import "./App.css";
import DuongDanURL from "./Components/DuongDanURL/DuongDanURL";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Menu/Navbar";
import Sidebar from "./Components/Menu/Sidebar";
import { AuthContext } from "./Context/AuthContext";
import { getMyAccount } from "./Service/AccountService";
import axios from "axios";

function App() {
  async function getIP() {
    try {
      const response = await axios.get("/api/get-ip");
      const ip = response.headers["x-forwarded-for"];
      console.log(`Your IP address is ${ip}`);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIP();
  }, []);

  const [account, setAccount] = useState(null);
  const authContext = useContext(AuthContext);
  const [visible, setVisiblity] = useState(true);

  useEffect(() => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
    });
  }, []);

  let main_bg = document.querySelector(".main_bg");
  useEffect(() => {
    console.log("Vào");
    // let arrEmoji = ["❄", "❊", "✽"];
    let arrEmoji = ["🧨", "🎇", "🌺", "🌸"];
    if (main_bg) {
      main_bg.addEventListener("mousemove", function (e) {
        let body = document.querySelector("body");
        let emoji = document.createElement("span");
        let x = e.offsetX;
        let y = e.offsetY;

        emoji.style.left = x + "px";
        emoji.style.top = y + "px";
        emoji.setAttribute("class", "emojimouse");

        let icon = arrEmoji[Math.floor(Math.random() * arrEmoji.length)];
        emoji.innerText = icon;

        let size = Math.random() * 30;
        emoji.style.fontSize = 5 + size + "px";

        let max = 0;
        let min = 0;
        let randomValue = Math.floor(Math.random() * (max + 1 - min) + min);
        emoji.style.transform = "translateX(" + randomValue + "px)";

        body.appendChild(emoji);

        setTimeout(() => {
          emoji.remove();
        }, 1000);
      });
    }
  }, [main_bg]);
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Main /> */}
      {authContext.isAuthenticated ? (
        <div className="container-scroller main_bg">
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

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config({
  path: "./configs/.env",
});

// netsh wlan show interfaces - Get info Wifi With CMD

// const wifi = require("node-wifi");

// wifi.init({
//   iface: null,
// });

// wifi.scan((err, networks) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(networks);
//     const bssid = ["fc:40:09:a6:3e:40"];
//     const ssid = ["MADIAD - LIVETRADE "];
//     networks.map((wifi) => {
//       // console.log(wifi.ssid);
//       // console.log(bssid.includes(wifi.bssid));
//       // console.log(ssid.includes(wifi.ssid));
//       if (bssid.includes(wifi.bssid) && ssid.includes(wifi.ssid)) {
//         console.log("Ok");
//       } else {
//         console.log("Not Ok");
//       }
//     });
//   }
// });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//kết nối với database

// const db = require("./configs/key").mongoURI;
const db = process.env.URL_MONGODB;
// const db = "mongodb://localhost:27017/TQLApp";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

//đường dẫn các api
app.use("/api/account", require("./routers/Account"));
app.use("/api/department", require("./routers/Department"));
app.use("/api/category", require("./routers/Category"));
app.use("/api/post", require("./routers/Post"));
app.use("/api/test", require("./routers/Test"));

//sử dụng khi môi trường là production dành để deploy ứng dụng
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}

//đặt port cho server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server Run With Port ${PORT}`));

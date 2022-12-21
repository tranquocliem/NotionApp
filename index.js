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
//     const ssid = ["MADIAD - LIVETRADE "];
//     networks.map((wifi) => {
//       if (ssid.includes(wifi.ssid)) {
//         console.log("Ok");
//       } else {
//         console.log("Not Ok");
//       }
//     });
//   }
// });

// wifi.getCurrentConnections((error, currentConnections) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(currentConnections);
//   }
// });

// const getmac = require("getmac");

// const physicalAddress = "28:39:26:65:25:1f";

// const callMac = () => {
//   console.log(getmac.default());
//   if (getmac.default() === physicalAddress) {
//     console.log("Bằng");
//   } else {
//     console.log("Ko Bằng");
//   }
// };

// callMac();

// const address = require("address");
// // default interface 'eth' on linux, 'en' on osx.
// address.ip();
// address.ipv6();
// address.mac(function (err, addr) {
//   console.log(addr);
// });

// var network = require("network");

// network.get_public_ip(function (err, ip) {
//   console.log(err || ip); // should return your public IP address
// });
// network.get_private_ip(function (err, ip) {
//   console.log(err || ip); // err may be 'No active network interface found'.
// });
// network.get_gateway_ip(function (err, ip) {
//   console.log(err || ip); // err may be 'No active network interface found.'
// });

// network.get_active_interface(function (err, obj) {
//   console.log(obj);
// });

// const getIP = require("external-ip")();

// getIP((err, ip) => {
//   if (err) {
//     // every service in the list has failed
//     throw err;
//   }
//   console.log(ip);
// });

// var spawn = require("child_process").spawn;
// wifiNetworksRSSI(function (err, data, raw) {
//   if (!err) {
//     console.log(data); // formatted data with SSID, BSSID, RSSI
//     // console.log(raw); // raw output from netsh
//   } else {
//     console.log(err);
//   }
// });

// function wifiNetworksRSSI(fn) {
//   // prepare result string of data
//   var res = "";
//   // spawn netsh with required settings
//   var netsh = spawn("netsh", ["wlan", "show", "networks", "mode=bssid"]);

//   // get data and append to main result
//   netsh.stdout.on("data", function (data) {
//     res += data;
//   });

//   // if error occurs
//   netsh.stderr.on("data", function (data) {
//     console.log("stderr: " + data);
//   });

//   // when done
//   netsh.on("close", function (code) {
//     if (code == 0) {
//       // normal exit
//       // prepare array for formatted data
//       var networks = [];
//       // split response to blocks based on double new line
//       var raw = res.split("\r\n\r\n");

//       // iterate through each block
//       for (var i = 0; i < raw.length; ++i) {
//         // prepare object for data
//         var network = {};

//         // parse SSID
//         var match = raw[i].match(/^SSID [0-9]+ : (.+)/);
//         if (match && match.length == 2) {
//           network.ssid = match[1];
//         } else {
//           network.ssid = "";
//         }

//         // if SSID parsed
//         if (network.ssid) {
//           // parse BSSID
//           var match = raw[i].match(" +BSSID [0-9]+ +: (.+)");
//           if (match && match.length == 2) {
//             network.bssid = match[1];
//           } else {
//             network.bssid = "";
//           }

//           // parse RSSI (Signal Strength)
//           var match = raw[i].match(" +Signal +: ([0-9]+)%");
//           if (match && match.length == 2) {
//             network.rssi = parseInt(match[1]);
//           } else {
//             network.rssi = NaN;
//           }

//           // push to list of networks
//           networks.push(network);
//         }
//       }

//       // callback with networks and raw data
//       fn(null, networks, res);
//     } else {
//       // if exit was not normal, then throw error
//       fn(new Error(code));
//     }
//   });
// }

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
app.use("/api/devices", require("./routers/Devices"));
app.use("/api/wifi", require("./routers/Wifi"));
app.use("/api/checkin", require("./routers/CheckIn"));
app.use("/api/checkout", require("./routers/CheckOut"));
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

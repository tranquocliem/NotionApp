import axios from "axios";

export const addDevice = () => {
  return axios
    .post("/api/devices/createMac")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Thêm thiết bị không thành công",
          msgError: true,
        },
        err,
      };
    });
};

export const getMyDevice = async () => {
  return axios
    .get("/api/devices/getMyDevices")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

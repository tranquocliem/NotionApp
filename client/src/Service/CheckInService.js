import axios from "axios";

export const getMyCheckIn = async () => {
  return axios
    .get("/api/checkin/getMyCheckin")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const getCheckInByID = async (id) => {
  return axios
    .get(`/api/checkin/getCheckInByUser/${id}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const createCheckIn = () => {
  return axios
    .post("/api/checkin/createCheckIn")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: "Check In không thành công",
        status: false,
        err,
      };
    });
};

export const deleteDepartment = (id) => {
  return axios
    .delete(`/api/department/deleteDepartment/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Xóa bộ phận không thành công",
          msgError: true,
        },
        err,
      };
    });
};

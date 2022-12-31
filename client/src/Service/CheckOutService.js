import axios from "axios";

export const getMyCheckOut = async () => {
  return axios
    .get("/api/checkout/getMyCheckout")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const getCheckOutByID = async (id) => {
  return axios
    .get(`/api/checkout/getCheckOutByID/${id}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const createCheckOut = (variable) => {
  return axios
    .post("/api/checkout/createCheckOut", variable)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: "Check Out không thành công",
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

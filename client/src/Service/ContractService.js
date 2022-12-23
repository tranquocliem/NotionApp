import axios from "axios";

export const getDepartment = async () => {
  return axios
    .get("/api/contract/getDepartment")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const addContract = (variable) => {
  return axios
    .post("/api/contract/createContract", variable)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Thêm bộ phận không thành công",
          msgError: true,
        },
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

import axios from "axios";

export const getDepartment = async () => {
  return axios
    .get("/api/department/getDepartment")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const addDepartment = (variable) => {
  return axios
    .post("/api/department/createDepartment", variable)
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

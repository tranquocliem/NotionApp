import axios from "axios";

// const baseURL = "https://notion-mwcn9kbzy-tranquocliem.vercel.app/api";

export const login = (user) => {
  return axios
    .post("/api/account/login", user)
    .then((res) => {
      if (res.status !== 401) {
        return res.data;
      } else {
        return {
          isAuthenticated: false,
          user: { username: "", role: "" },
          message: { msgBody: "Error", msgError: true },
        };
      }
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Có lỗi xảy ra vui lòng quay lại sau",
          msgError: true,
        },
      };
    });
};

export const logout = async () => {
  const data = await axios.get("/api/account/logout");
  if (data) {
    return data;
  }
};

export const addAccount = (variable) => {
  return axios
    .post("/api/account/addAccount", variable)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Thêm tài khoản không thành công",
          msgError: true,
        },
        err,
      };
    });
};

export const addAccountByAdmin = (variable) => {
  return axios
    .post("/api/account/addAccountByAdmin", variable)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Cập nhật không thành công",
          msgError: true,
        },
        err,
      };
    });
};

export const getAllAccount = async () => {
  return axios
    .get("/api/account/getAccount")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const getMyAccount = async () => {
  return axios
    .get("/api/account/getMyAccount")
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data;
    });
};

export const updateAccount = (variable) => {
  return axios
    .patch("/api/account/updateAccount", variable)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Cập nhật không thành công",
          msgError: true,
        },
        err,
      };
    });
};

export const destroyAvatar = () => {
  return axios
    .delete("/api/account/destroyAvatar")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return {
        message: {
          msgBody: "Cập nhật không thành công",
          msgError: true,
        },
        err,
      };
    });
};

export const isAuthenticated = () => {
  return fetch("/api/account/authenticated").then((res) => {
    if (res.status !== 401) return res.json().then((data) => data);
    else {
      return { isAuthenticated: false, user: { username: "" } };
    }
  });
};

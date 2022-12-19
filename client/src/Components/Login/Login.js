import { useContext, useState } from "react";
import { login } from "../../Service/AccountService";
import { AuthContext } from "../../Context/AuthContext";
import "./index.css";
import { MyAlert } from "../Alert/Alert";
function Login() {
  const [hidePass, setHidePass] = useState(true);
  const [userData, setUserData] = useState({ username: "", password: "" });

  const authContext = useContext(AuthContext);

  const [disBtnLogin, setDisBtnLogin] = useState(false);

  const resetForm = () => {
    setUserData({
      username: "",
      password: "",
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const hidePassword = () => {
    setHidePass(!hidePass);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisBtnLogin(true);
    if (userData.username !== "" && userData.password !== "") {
      const data = await login(userData);
      // setDisBtnLogin(true);
      if (data && data.isAuthenticated) {
        MyAlert(
          "succ",
          `Chúc mừng ${data.user.username} đã đăng nhập thành công`,
          2500
        );
        authContext.setUser(userData);
        authContext.setIsAuthenticated(data.isAuthenticated);
        setDisBtnLogin(false);
        resetForm();
      } else {
        MyAlert("err", "Sai Tài Khoản Hoặc Mật Khẩu", 3500);
        setDisBtnLogin(false);
      }
    } else {
      if (userData.username === "") {
        MyAlert("war", "Vui Lòng Nhập Username Hoặc Email", 3500);
        setDisBtnLogin(false);
      }
      if (userData.password === "") {
        MyAlert("war", "Vui Lòng Nhập Password", 3500);
        setDisBtnLogin(false);
      }
    }
  };

  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          {!authContext.isAuthenticated ? (
            <>
              <div className="bg-login">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="row w-100 m-0">
                {/* <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg"> */}
                <div className="content-wrapper full-page-wrapper d-flex align-items-center">
                  <div className="card col-xl-4 mx-auto">
                    <div className="card-body px-5 py-5">
                      <h3 className="card-title text-success title-login text-center mb-5 font-weight">
                        Đăng Nhập
                      </h3>
                      <form>
                        <div className="form-group">
                          <label className="text-muted">
                            Username hoặc email *
                          </label>
                          {/* <input
                        type="text"
                        className="form-control p_input text-light"
                      /> */}
                          <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={onChangeInput}
                            className="form-control p_input text-light"
                            spellCheck="false"
                          />
                        </div>
                        <div className="form-group">
                          <label className="text-muted">Mật khẩu *</label>
                          <div className="d-flex">
                            <input
                              type={hidePass ? "password" : "text"}
                              name="password"
                              value={userData.password}
                              onChange={onChangeInput}
                              className="form-control p_input text-light"
                            />
                            <div className="input-group-append">
                              <span
                                onClick={hidePassword}
                                className="input-group-text"
                              >
                                {hidePass ? (
                                  <ion-icon
                                    name="eye-outline"
                                    id="show_eye"
                                  ></ion-icon>
                                ) : (
                                  <ion-icon
                                    name="eye-off-outline"
                                    id="hide_eye"
                                  ></ion-icon>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            disabled={disBtnLogin}
                            type="submit"
                            className="btn btn-success btn-block enter-btn text-dark btn-login p-3"
                            onClick={onSubmit}
                          >
                            {disBtnLogin ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Đăng Nhập"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Login;

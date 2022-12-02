import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
function Login() {
  const [hidePass, setHidePass] = useState(true);
  const hidePassword = () => {
    setHidePass(!hidePass);
  };

  useEffect(() => {
    const getAPI = async () => {
      const data = await axios.get(
        "https://notion-app-lac.vercel.app/api/test/getData"
      );
      console.log(data);
    };
    getAPI();
  }, []);
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="row w-100 m-0">
            <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
              <div className="card col-lg-4 mx-auto">
                <div className="card-body px-5 py-5">
                  <h3 className="card-title text-center mb-5">Đăng Nhập</h3>
                  <form>
                    <div className="form-group">
                      <label>Username hoặc email *</label>
                      <input
                        type="text"
                        className="form-control p_input text-light"
                      />
                    </div>
                    <div className="form-group">
                      <label>Mật khẩu *</label>
                      <div className="d-flex">
                        <input
                          type={hidePass ? "password" : "text"}
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
                        type="submit"
                        className="btn btn-primary btn-block enter-btn"
                      >
                        Đăng Nhập
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

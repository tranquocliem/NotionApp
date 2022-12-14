import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getMyAccount, isAuthenticated } from "../../Service/AccountService";
import EditAccount from "./EditAccount";
import "./index.css";

function MyAccount() {
  const [account, setAccount] = useState();
  const [onModal, setOnModal] = useState(false);
  const { setUser } = useContext(AuthContext);

  const offModal = () => {
    setOnModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
    });
  }, []);

  const updateProfile = () => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
      isAuthenticated().then((data) => {
        setUser(data.user);
      });
    });
  };

  return (
    <>
      {account ? (
        <>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-9 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="row card-title">
                    <div className="col-6 text-left">
                      <h3>Thông tin tài khoản</h3>
                    </div>
                    <div className="col-6 text-right">
                      <button
                        className="btn btn-sm btn-primary text-right"
                        onClick={() => setOnModal(true)}
                      >
                        <i className="fa-solid fa-gear"></i>
                      </button>
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center mb-3">
                    <div className="avatar_main">
                      <img src={account.avatar} alt="avartar" />
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>

                  <div className="row mb-1">
                    <div className="col-xl-6 text-left">
                      <h6>
                        Họ và tên:{" "}
                        <span className="float-right">
                          {account.fullname
                            ? account.fullname
                            : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                      <h6>
                        E-mail:{" "}
                        <span className="float-right">
                          {account.email ? account.email : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                      <h6>
                        Số điện thoại:
                        <span className="float-right">
                          {account.sdt ? account.sdt : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                    </div>
                    <div className="col-xl-6 text-left">
                      <h6>
                        Bộ phận:{" "}
                        <span className="float-right">
                          {account.department
                            ? account.department.name
                            : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                      <h6>
                        Chức vụ:{" "}
                        <span className="float-right">
                          {account.position
                            ? account.position
                            : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                      <h6>
                        Ví Onus:{" "}
                        <span className="float-right">
                          {account.walletonus
                            ? account.walletonus
                            : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditAccount
            account={account}
            onModal={onModal}
            offModal={offModal}
            updateProfile={updateProfile}
          />
        </>
      ) : (
        <div
          style={{ height: "100%", opacity: "75%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default MyAccount;

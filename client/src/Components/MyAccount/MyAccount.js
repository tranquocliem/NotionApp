import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getMyAccount, isAuthenticated } from "../../Service/AccountService";
import EditAccount from "./EditAccount";
import "./index.css";
import moment from "moment";
import "moment/locale/vi";
import { getMyDevice } from "../../Service/DeviceService";
// import { MyAlert } from "../Alert/Alert";
import { Link } from "react-router-dom";

function MyAccount() {
  const [account, setAccount] = useState();
  const [onModal, setOnModal] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [dataDevice, setDataDevice] = useState(true);
  // const [pendingBtn, setPendingBtn] = useState(false);

  const offModal = () => {
    setOnModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
    });
  }, []);

  useEffect(() => {
    async function getAPIDevice() {
      const dataDevice = await getMyDevice();
      if (dataDevice && dataDevice.status) {
        setDataDevice(true);
      } else {
        setDataDevice(false);
      }
    }
    getAPIDevice();
  }, [dataDevice]);

  const updateProfile = () => {
    getMyAccount().then((data) => {
      setAccount(data.dataUser);
      isAuthenticated().then((data) => {
        setUser(data.user);
      });
    });
  };

  const dateCre = moment(
    account && account.birthday ? account.birthday : null
  ).format("DD/MM/YYYY");

  // const btnAddDevice = async () => {
  //   setPendingBtn(true);
  //   const data = await addDevice();
  //   if (data && data.status) {
  //     MyAlert("succ", "Bạn đã thêm thiết bị thành công", 3000);
  //     const dataDevice = await getMyDevice();
  //     if (dataDevice && dataDevice.status) {
  //       setDataDevice(true);
  //       setPendingBtn(false);
  //     } else {
  //       setDataDevice(false);
  //       setPendingBtn(false);
  //     }
  //   } else {
  //     MyAlert("err", "Thêm thiết bị không thành công", 3000);
  //   }
  // };

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
                        Ngày sinh:
                        <span className="float-right">
                          {dateCre ? dateCre : "Không xác định"}
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
                      <h6>
                        CMND/CCCD:
                        <span className="float-right">
                          {account.cccd ? account.cccd : "Không xác định"}
                        </span>
                      </h6>
                      <div className="dropdown-divider"></div>
                      <h6>
                        Quốc tịch:
                        <span className="float-right">
                          {account.nationality
                            ? account.nationality
                            : "Không xác định"}
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
                        TK ngân hàng:{" "}
                        <span className="float-right">
                          {account.bankaddress
                            ? account.bankaddress
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
                      <h6>
                        Hợp đồng:{" "}
                        <span className="float-right">
                          {account.contract
                            ? account.contract.typeContract
                            : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                      <h6>
                        Dân tộc:
                        <span className="float-right">
                          {account.ethnic ? account.ethnic : "Không xác định"}
                        </span>
                      </h6>

                      <div className="dropdown-divider"></div>
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-xl-12 text-left">
                      <h6>
                        Địa chỉ thường trú:
                        <span className="float-right">
                          {account.address1
                            ? account.address1
                            : "Không xác định"}
                        </span>
                      </h6>
                      <div className="dropdown-divider"></div>
                      <h6>
                        Địa chỉ tạm trú:
                        <span className="float-right">
                          {account.address2
                            ? account.address2
                            : "Không xác định"}
                        </span>
                      </h6>
                      <div className="dropdown-divider"></div>
                    </div>
                  </div>

                  {/* <div className="row">
                    <div className="col-xl-12 text-left">
                      {!dataDevice ? (
                        <button
                          className="btn btn-primary mx-3"
                          onClick={btnAddDevice}
                        >
                          {pendingBtn ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Đăng ký thiết bị"
                          )}
                        </button>
                      ) : (
                        <i className="text-muted">
                          ✔ Tài khoản của bạn đã được đăng ký thiết bị
                        </i>
                      )}

                      <div className="dropdown-divider"></div>
                    </div>
                  </div> */}

                  <div className="row">
                    <div className="col-xl-12 text-left">
                      <Link to={`/thong-tin-check-in-out/${user.username}`}>
                        <button className="btn btn-warning">
                          Thông Tin Check In - Out
                        </button>
                      </Link>

                      {account.contract && account.contract.typeContract ? (
                        <Link
                          to={`/check-out/${account._id}/${account.fullname}`}
                          className=" mx-3  mt-2"
                        >
                          <button className="btn btn-success">
                            Thông Tin Hợp Đồng
                          </button>
                        </Link>
                      ) : null}

                      <div className="dropdown-divider"></div>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-xl-12 text-left">
                      <i className="text-muted">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam nesciunt minima laudantium tenetur nostrum sequi
                        nihil repellat odio consequatur exercitationem, id
                        voluptas quibusdam ipsum voluptate vitae pariatur!
                        Quidem, non ut.
                      </i>
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

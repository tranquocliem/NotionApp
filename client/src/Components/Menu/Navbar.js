import avatar from "../../img/avatar.jpg";
import { useState } from "react";
function Navbar(props) {
  const [visible, setVisiblity] = useState(true);
  const styleColor = {
    primary: "#0090e7",
    info: "#8f5fe8",
    succcess: "#00d25b",
    warnning: "#ffab00",
    danger: "#fc424a",
  };
  return (
    <>
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <a className="navbar-brand brand-logo-mini text-success" href="/">
            TQL App
          </a>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
            onClick={() => {
              setVisiblity(!visible);
              props.changeToggle(visible);
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm ghi chú"
                />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown d-none d-lg-block">
              <button
                className="nav-link btn btn-success create-new-button"
                id="createbuttonDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                + Tạo Mới
              </button>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="createbuttonDropdown"
              >
                <h6 className="p-3 mb-0">Tùy Chọn</h6>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-note-sticky"
                        color={styleColor.primary}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Tạo Ghi Chú Mới
                    </p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-list-ol"
                        color={styleColor.info}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      Tạo Danh Sách Ghi Chú Mới
                    </p>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <p
                  className="p-3 mb-0 text-center"
                  style={{ cursor: "pointer" }}
                >
                  Xem Tất Cả Ghi Chú
                </p>
              </div>
            </li>
            <li className="nav-item dropdown border-left">
              <a
                className="nav-link count-indicator dropdown-toggle"
                id="notificationDropdown"
                href="#!"
                data-toggle="dropdown"
              >
                <i className="fa-solid fa-bell"></i>
                <span className="count bg-danger"></span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <h6 className="p-3 mb-0">Thông Báo</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item" href="#!">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-calendar-day"
                        color={styleColor.succcess}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Sự kiên hôm nay</p>
                    <p className="text-muted ellipsis mb-0">
                      Code trang ETH Viet Nam
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item" href="#!">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-list-ol"
                        color={styleColor.info}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      Tạo Danh Sách Thành Công
                    </p>
                    <p className="text-muted ellipsis mb-0">Code Javascript</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item" href="#!">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-note-sticky"
                        color={styleColor.primary}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      Tạo Ghi Chú Thành Công
                    </p>
                    <p className="text-muted ellipsis mb-0">
                      Thư viện js code hay
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <p
                  className="p-3 mb-0 text-center"
                  style={{ cursor: "pointer" }}
                >
                  Xem Tất Cả Thông Báo
                </p>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                id="profileDropdown"
                href="#avatar"
                data-toggle="dropdown"
              >
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={avatar} alt="" />
                  <p className="mb-0 p-2 d-none d-sm-block navbar-profile-name">
                    Trần Quốc Liêm
                  </p>
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="profileDropdown"
              >
                <h6 className="p-3 mb-0">Thông Tin</h6>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item" href="#!">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-gear"
                        style={{ color: "#00d25b" }}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Cài Đặt</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item" href="#!">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i
                        className="fa-solid fa-right-from-bracket"
                        style={{ color: "#fc424a" }}
                      ></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Đăng Xuất</p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <p
                  className="p-3 mb-0 text-center"
                  style={{ cursor: "pointer" }}
                >
                  Cài Đặt Nâng Cao
                </p>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <i className="fa-solid fa-align-right"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

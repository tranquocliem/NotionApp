import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { logout } from "../../Service/AccountService";
import "./index.css";
function Sidebar(props) {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);

  const styleColor = {
    primary: "#0090e7",
    info: "#8f5fe8",
    succcess: "#00d25b",
    warnning: "#ffab00",
    danger: "#fc424a",
  };

  let displayName = user && user.fullname ? user.fullname.split(" ") : [];

  const Logout = async () => {
    const data = await logout();
    if (data.data.success) {
      setUser(data.user);
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <Link
            className="sidebar-brand brand-logo text-success text_logo"
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            TQL App
          </Link>
          <Link
            className="sidebar-brand brand-logo-mini text-success text_logo"
            to="/"
          >
            TQL
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img
                    className="img-xs rounded-circle "
                    src={user && user.avatar}
                    alt=""
                  />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">
                    {user && user.fullname
                      ? `🎉 Xin chào, ${displayName[displayName.length - 1]}`
                      : "Không Xác Định"}
                  </h5>

                  <span className="text-uppercase">{user && user.role}</span>
                </div>
              </div>
              {props.hide ? (
                <>
                  <a
                    href="#!"
                    id="profile-dropdown"
                    className="text-success"
                    data-toggle="dropdown"
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
                    aria-labelledby="profile-dropdown"
                  >
                    <Link
                      to={`/tai-khoan/${user && user.username}`}
                      className="dropdown-item preview-item"
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i
                            className="fa-solid fa-user"
                            color={styleColor.primary}
                          ></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          Tài Khoản
                        </p>
                      </div>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link
                      to={`/doi-mat-khau/${user && user.username}`}
                      className="dropdown-item preview-item"
                    >
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i
                            className="fa-solid fa-key"
                            color={styleColor.warnning}
                          ></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1 text-small">
                          Đổi Mật Khẩu
                        </p>
                      </div>
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Menu</span>
          </li>
          <li className="nav-item menu-items">
            <NavLink exact className="nav-link" to="/">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-house"
                  color={styleColor.succcess}
                ></i>
              </span>
              <span className="menu-title">Trang Chủ</span>
            </NavLink>
          </li>
          <li className="nav-item menu-items">
            <NavLink exact className="nav-link" to="/checkin">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-calendar-check"
                  color={styleColor.warnning}
                ></i>
              </span>
              <span className="menu-title">Check In</span>
            </NavLink>
          </li>
          <li className="nav-item menu-items">
            <NavLink exact className="nav-link" to="/checkout">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-calendar-check"
                  color={styleColor.danger}
                ></i>
              </span>
              <span className="menu-title">Check Out</span>
            </NavLink>
          </li>
          <div className="dropdown-divider"></div>
          <li className="nav-item menu-items">
            <NavLink to="/tat-ca-nhan-vien" className="nav-link" href="#!">
              <span className="menu-icon">
                {/* <i>👆</i> */}
                <i className="text-danger">All</i>
              </span>
              <span className="menu-title">Tất Cả Nhân Viên</span>
            </NavLink>
          </li>
          <li className="nav-item menu-items">
            <NavLink className="nav-link" to="/danh-sach-truong-bo-phan">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-note-sticky"
                  color={styleColor.primary}
                ></i>
              </span>
              <span className="menu-title">Trưởng Bộ Phận</span>
            </NavLink>
          </li>
          {/* <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>👇</i>
              </span>
              <span className="menu-title">Ghi Chú Cũ Nhất</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>✨</i>
              </span>
              <span className="menu-title">Ghi Chú Quan Trọng</span>
            </a>
          </li> */}
          <div className="dropdown-divider"></div>
          <li className="nav-item menu-items">
            <NavLink to="/danh-sach-bo-phan" className="nav-link">
              <span className="menu-icon">
                <i className="fa-solid fa-list-ol" color={styleColor.info}></i>
              </span>
              <span className="menu-title">Danh Sách Bộ Phận</span>
            </NavLink>
          </li>
          {/* <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>👆</i>
              </span>
              <span className="menu-title">Danh Sách Mới Nhất</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>👆</i>
              </span>
              <span className="menu-title">Danh Sách Cũ Nhất</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>✨</i>
              </span>
              <span className="menu-title">Danh Sách Quan Trọng</span>
            </a>
          </li> */}
          <div className="dropdown-divider"></div>
          {/* <li className="nav-item menu-items">
            <a className="nav-link" href="#!l">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-chart-simple"
                  color={styleColor.danger}
                ></i>
              </span>
              <span className="menu-title">Thống Kê</span>
            </a>
          </li> */}
          <li className="nav-item menu-items d-lg-none">
            <Link onClick={Logout} className="nav-link" to="/">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ color: "#fc424a" }}
                ></i>
              </span>
              <span className="menu-title">Đăng Xuất</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

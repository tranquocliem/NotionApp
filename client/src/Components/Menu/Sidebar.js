import avatar from "../../img/avatar.jpg";
function Sidebar(props) {
  const styleColor = {
    primary: "#0090e7",
    info: "#8f5fe8",
    succcess: "#00d25b",
    warnning: "#ffab00",
    danger: "#fc424a",
  };
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a
            className="sidebar-brand brand-logo text-success text_logo"
            href="/"
          >
            TQL App
          </a>
          <a
            className="sidebar-brand brand-logo-mini text-success text_logo"
            href="/"
          >
            TQL
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={avatar} alt="" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">Trần Quốc Liêm</h5>
                  <span>Super Admin</span>
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
                    <a href="#!" className="dropdown-item preview-item">
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
                    </a>
                    <div className="dropdown-divider"></div>
                    <a href="#!" className="dropdown-item preview-item">
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
                    </a>
                  </div>
                </>
              ) : null}
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">Menu</span>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="/">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-house"
                  color={styleColor.succcess}
                ></i>
              </span>
              <span className="menu-title">Trang Chủ</span>
            </a>
          </li>
          <div className="dropdown-divider"></div>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-note-sticky"
                  color={styleColor.primary}
                ></i>
              </span>
              <span className="menu-title">Ghi Chú</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i>👆</i>
              </span>
              <span className="menu-title">Ghi Chú Mới Nhất</span>
            </a>
          </li>
          <li className="nav-item menu-items">
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
          </li>
          <div className="dropdown-divider"></div>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i className="fa-solid fa-list-ol" color={styleColor.info}></i>
              </span>
              <span className="menu-title">Danh Sách</span>
            </a>
          </li>
          <li className="nav-item menu-items">
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
          </li>
          <div className="dropdown-divider"></div>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!l">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-chart-simple"
                  color={styleColor.danger}
                ></i>
              </span>
              <span className="menu-title">Thống Kê</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-circle-info"
                  color={styleColor.warnning}
                ></i>
              </span>
              <span className="menu-title">Giới Thiệu</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="#!">
              <span className="menu-icon">
                <i
                  className="fa-solid fa-phone-volume"
                  color={styleColor.succcess}
                ></i>
              </span>
              <span className="menu-title">Liên Hệ</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;

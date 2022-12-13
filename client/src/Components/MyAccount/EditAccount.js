import { useEffect, useState } from "react";
import { destroyAvatar, updateAccount } from "../../Service/AccountService";
import { checkImage, uploadImage } from "../../Shared/HandleImage";
import { MyAlert } from "../Alert/Alert";

function EditAccount(props) {
  const account = props.account;
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    sdt: "",
    walletonus: "",
  });

  const [pending, setPending] = useState(false);

  useEffect(() => {
    setUserData({
      fullname: account.fullname,
      email: account.email,
      sdt: account.sdt,
      walletonus: account.walletonus,
    });
  }, [account]);

  const offModal = () => {
    props.offModal();
    setUserData({
      fullname: account.fullname,
      email: account.email,
      sdt: account.sdt,
      walletonus: account.walletonus,
    });
    setAvatar("");
    setPending(false);
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return MyAlert("err", err, 3500);
    }
    setAvatar(file);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateProfile = async () => {
    try {
      let media;
      setPending(true);
      if (avatar) {
        destroyAvatar();
        media = await uploadImage([avatar]);
      }
      const variable = {
        fullname: userData.fullname,
        email: userData.email,
        sdt: userData.sdt,
        walletonus: userData.walletonus,
        avatar: avatar ? media[0].url : account.avatar,
      };
      const data = await updateAccount(variable);
      const { status } = data;
      if (!status) {
        MyAlert("err", "Cập Nhật Không Thành Công", 3500);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      props.updateProfile();
      offModal();
      MyAlert("succ", "Cập Nhật Thành Thành Công", 3000);
      setPending(false);
    } catch (error) {
      MyAlert("err", "Cập Nhật Không Thành Công", 3500);
    }
  };

  return (
    <div>
      {props.onModal ? (
        <div className="my-show" onClick={offModal}></div>
      ) : null}
      <div
        className={`my-modal row w-100 ${
          props.onModal && "d-flex justify-content-center"
        } `}
        style={!props.onModal ? { display: "none", overflow: "hidden" } : null}
      >
        <div className="col-xl-6">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Chỉnh sửa cá nhân
                </h5>
                <button
                  className="btn btn-sm btn-primary text-right btn-close"
                  onClick={offModal}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="info-avatar">
                    <img
                      src={
                        avatar ? URL.createObjectURL(avatar) : account.avatar
                      }
                      alt="avatar"
                    />
                    <span>
                      <i className="fas fa-camera"></i>
                      <p>Thay đổi</p>
                      <input
                        title="Thay đổi ảnh"
                        type="file"
                        name="file"
                        id="file-up"
                        // accept="image/*"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={changeAvatar}
                        className="form-control"
                      />
                    </span>
                  </div>
                  <div className="mb-3 text-left">
                    <div className="form-group">
                      <div className="position-relative">
                        <label htmlFor="fullname">Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullname"
                          name="fullname"
                          value={userData.fullname}
                          onChange={onChange}
                          spellCheck="false"
                        />
                        <small
                          style={{
                            top: "72%",
                            right: "5px",
                            transform: "translateY(-50%)",
                          }}
                          className="text-danger position-absolute"
                        ></small>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 text-left">
                    <div className="form-group">
                      <div className="position-relative">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={onChange}
                          spellCheck="false"
                        />
                        <small
                          style={{
                            top: "72%",
                            right: "5px",
                            transform: "translateY(-50%)",
                          }}
                          className="text-danger position-absolute"
                        ></small>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 text-left">
                    <div className="form-group">
                      <div className="position-relative">
                        <label htmlFor="sdt">Số Điện Thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sdt"
                          name="sdt"
                          value={userData.sdt}
                          onChange={onChange}
                          spellCheck="false"
                        />
                        <small
                          style={{
                            top: "72%",
                            right: "5px",
                            transform: "translateY(-50%)",
                          }}
                          className="text-danger position-absolute"
                        ></small>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 text-left">
                    <div className="form-group">
                      <div className="position-relative">
                        <label htmlFor="sdt">Ví Onus</label>
                        <input
                          type="text"
                          className="form-control"
                          id="walletonus"
                          name="walletonus"
                          value={userData.walletonus}
                          onChange={onChange}
                          spellCheck="false"
                        />
                        <small
                          style={{
                            top: "72%",
                            right: "5px",
                            transform: "translateY(-50%)",
                          }}
                          className="text-danger position-absolute"
                        ></small>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={offModal}
                >
                  Tắt
                </button>
                <button
                  onClick={updateProfile}
                  type="submit"
                  className="btn btn-primary"
                  disabled={pending}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          {pending ? (
            <div className="loadingModal">
              <div className="spinner-border loading-spinner" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EditAccount;

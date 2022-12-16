import { useEffect, useState } from "react";
import {
  destroyAvatar,
  updateAccountByAdmin,
  updateAccountBySpadmin,
} from "../../Service/AccountService";
import { checkImage, uploadImage } from "../../Shared/HandleImage";
import { MyAlert } from "../Alert/Alert";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import Selects from "../AddUser/Selecter";
registerLocale("vi", vi);

function EditDetailsAccount(props) {
  const account = props.account;
  const { user } = props;
  const { idUser } = props;
  const [avatar, setAvatar] = useState("");
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    sdt: "",
    cccd: "",
    nationality: "",
    address1: "",
    address2: "",
    bankaddress: "",
    ethnic: "",
    walletonus: "",
  });

  const [birthday, setBirthday] = useState(new Date("01/01/2000"));

  const [pending, setPending] = useState(false);

  const [departments, setDepartments] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    setUserData({
      fullname: account.fullname,
      birthday: account.birthday,
      email: account.email,
      sdt: account.sdt,
      cccd: account.cccd,
      nationality: account.nationality,
      address1: account.address1,
      address2: account.address2,
      bankaddress: account.bankaddress,
      ethnic: account.ethnic,
      walletonus: account.walletonus,
    });
    setBirthday(new Date(account.birthday ? account.birthday : birthday));
    setDepartments(account.department ? account.department.name : departments);
    setPosition(account.position ? account.position : position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const offModal = () => {
    props.offModal();
    setUserData({
      fullname: account.fullname,
      birthday: account.birthday,
      email: account.email,
      sdt: account.sdt,
      cccd: account.cccd,
      nationality: account.nationality,
      address1: account.address1,
      address2: account.address2,
      bankaddress: account.bankaddress,
      ethnic: account.ethnic,
      walletonus: account.walletonus,
    });
    setBirthday(new Date(account.birthday ? account.birthday : birthday));
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

  const onChangeDate = (date) => {
    setBirthday(date);
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
        birthday: birthday,
        email: userData.email,
        sdt: userData.sdt,
        cccd: userData.cccd,
        nationality: userData.nationality,
        address1: userData.address1,
        address2: userData.address2,
        bankaddress: userData.bankaddress,
        ethnic: userData.ethnic,
        walletonus: userData.walletonus,
        avatar: avatar ? media[0].url : account.avatar,
      };

      const variable2 = {
        department: departments.value ? departments.value : null,
        position: position,
      };

      if (user.role === "spadmin") {
        const data = await updateAccountBySpadmin(idUser, variable);
        const { status } = data;
        if (!status) {
          return MyAlert("err", "Cập Nhật Không Thành Công", 3500);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        props.updateProfile();
        offModal();
        MyAlert("succ", "Cập Nhật Thành Thành Công", 3000);
        return setPending(false);
      } else {
        const data = await updateAccountByAdmin(idUser, variable2);
        const { status } = data;
        if (!status) {
          return MyAlert("err", "Cập Nhật Không Thành Công", 3500);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        props.updateProfile();
        offModal();
        MyAlert("succ", "Cập Nhật Thành Thành Công", 3000);
        return setPending(false);
      }
    } catch (error) {
      return MyAlert("err", "Cập Nhật Không Thành Công", 3500);
    }
  };

  const handleDepartment = (value) => {
    setDepartments(value);
  };

  const changPosition = (e) => {
    setPosition(e.target.value);
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
                {}
                <button
                  className="btn btn-sm btn-primary text-right btn-close"
                  onClick={offModal}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              {user.role === "spadmin" ? (
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
                          <label
                            className="text-secondary"
                            htmlFor="inputemail"
                          >
                            Ngày sinh
                          </label>
                          <br />
                          <DatePicker
                            name="birthday"
                            className="form-control"
                            selected={birthday}
                            value={birthday}
                            dateFormat="dd/MM/yyyy"
                            disabledKeyboardNavigation
                            placeholderText="Ngày Sinh"
                            onChange={onChangeDate}
                            locale="vi"
                            minDate={new Date("01/01/1970")}
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
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
                          <label htmlFor="sdt">Số điện thoại</label>
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
                          <label htmlFor="cccd">CMND/CCCD</label>
                          <input
                            type="text"
                            className="form-control"
                            id="cccd"
                            name="cccd"
                            value={userData.cccd}
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
                          <label htmlFor="cccd">Quốc tịch</label>
                          <input
                            type="text"
                            className="form-control"
                            id="nationality"
                            name="nationality"
                            value={userData.nationality}
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
                          <label htmlFor="cccd">Dân tộc</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ethnic"
                            name="ethnic"
                            value={userData.ethnic}
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
                          <label htmlFor="cccd">Địa chỉ thường trú</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ethnic"
                            name="ethnic"
                            value={userData.address1}
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
                          <label htmlFor="cccd">Địa chỉ tạm trú</label>
                          <input
                            type="text"
                            className="form-control"
                            id="ethnic"
                            name="ethnic"
                            value={userData.address2}
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
                          <label htmlFor="sdt">TK ngân hàng</label>
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
              ) : (
                <div className="modal-body">
                  <form>
                    <div className="mb-3 text-left">
                      <div className="form-group">
                        <div className="position-relative">
                          <label htmlFor="exampleSelectDepartment">
                            Chọn bộ phận
                          </label>
                          <Selects
                            handleDepartment={handleDepartment}
                            departments={departments}
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
                          <label htmlFor="exampleInputConfirmPosition">
                            Chức vụ
                          </label>
                          <input
                            type="text"
                            name="position"
                            className="form-control text-light"
                            id="exampleInputConfirmPosition"
                            placeholder="Chức vụ"
                            value={position}
                            onChange={changPosition}
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
              )}

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

export default EditDetailsAccount;

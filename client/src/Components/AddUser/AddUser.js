import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Selects from "./Selecter";
import "./index.css";
import { MyAlert } from "../Alert/Alert";
import { addAccount, addAccountByAdmin } from "../../Service/AccountService";

function AddUser() {
  const { user } = useContext(AuthContext);
  const [pending, setPending] = useState(false);

  const [dataInput, setDataInput] = useState({
    username: "",
    email: "",
    role: "",
    position: "",
    sdt: "",
    password: "",
    confirmPassword: "",
  });
  const [departments, setDepartments] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    const newDataInput = { ...dataInput };
    newDataInput[e.target.name] = e.target.value;
    setDataInput(newDataInput);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const variable = {
      username: dataInput.username,
      email: dataInput.email,
      role: dataInput.role,
      department: departments.value,
      position: dataInput.position,
      sdt: dataInput.sdt,
      password: dataInput.password,
      confirmPassword: dataInput.confirmPassword,
    };
    if (
      dataInput.username &&
      dataInput.role &&
      dataInput.password &&
      dataInput.confirmPassword &&
      dataInput.password === dataInput.confirmPassword
    ) {
      if (user.role === "spadmin") {
        const data = await addAccount(variable);
        if (data.status) {
          setPending(false);
          return MyAlert("succ", `${data.message}`, 2500);
        } else {
          setPending(false);
          return MyAlert("err", `${data.message}`, 3500);
        }
      } else {
        const data = await addAccountByAdmin(variable);
        if (data.status) {
          setPending(false);
          return MyAlert("succ", `${data.message}`, 2500);
        } else {
          setPending(false);
          return MyAlert("err", `${data.message}`, 3500);
        }
      }
    }
    if (
      !dataInput.username ||
      !dataInput.role ||
      !dataInput.password ||
      !dataInput.confirmPassword
    ) {
      setPending(false);
      return MyAlert(
        "err",
        "Vui lòng không bỏ trống các trường có dấu (*)",
        3500
      );
    }
    if (dataInput.password !== dataInput.confirmPassword) {
      setPending(false);
      return MyAlert("warr", "Mật khẩu xác nhận không chính xác", 3500);
    }
  };

  const handleDepartment = (value) => {
    setDepartments(value);
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Tạo Tài Khoản Mới</h3>
              <i className="text-muted">(*) Vui lòng không bỏ trống</i>
              <form className="forms-sample">
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputUsername1">Username (*)</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputUsername1"
                    placeholder="Username"
                    value={dataInput.username}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputEmail1">E-mail</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control text-light"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    value={dataInput.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleSelectGender">
                    Loại tài khoản (*)
                  </label>
                  <select
                    className="form-control text-light"
                    id="exampleSelectGender"
                    name="role"
                    value={dataInput.role}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Chọn Loại Tài Khoản
                    </option>
                    {user.role === "spadmin" && (
                      <>
                        <option value="spadmin">SPADMIN</option>
                        <option value="admin">ADMIN</option>
                      </>
                    )}

                    <option value="leader">Leader</option>
                    <option value="member">Nhân Viên</option>
                  </select>
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleSelectDepartment">Chọn bộ phận</label>
                  <Selects
                    handleDepartment={handleDepartment}
                    departments={departments}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmPosition">Chức vụ</label>
                  <input
                    type="text"
                    name="position"
                    className="form-control text-light"
                    id="exampleInputConfirmPosition"
                    placeholder="Chức vụ"
                    value={dataInput.position}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmSDT">Số điện thoại</label>
                  <input
                    name="sdt"
                    type="number"
                    className="form-control text-light"
                    id="exampleInputConfirmSDT"
                    placeholder="Số điện thoại"
                    value={dataInput.sdt}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputPassword1">Mật khẩu (*)</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputPassword1"
                    placeholder="Mật khẩu"
                    value={dataInput.password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmPassword1">
                    Xác thực mật khẩu (*)
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputConfirmPassword1"
                    placeholder="Xác thực mật khẩu"
                    value={dataInput.confirmPassword}
                    onChange={onChange}
                  />
                </div>

                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  + Thêm Tài Khoản
                </button>
              </form>
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
    </>
  );
}

export default AddUser;

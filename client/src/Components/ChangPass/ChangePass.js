import { useState } from "react";
import { changePass, logout } from "../../Service/AccountService";
import { MyAlert } from "../Alert/Alert";

function ChangePass() {
  const [pending, setPending] = useState(false);

  const [dataInput, setDataInput] = useState({
    old_Password: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    const newDataInput = { ...dataInput };
    newDataInput[e.target.name] = e.target.value;
    setDataInput(newDataInput);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const variable = {
      password: dataInput.password,
      configPassword: dataInput.confirmPassword,
      old_Password: dataInput.old_Password,
    };
    setPending(true);

    if (
      dataInput.password &&
      dataInput.confirmPassword &&
      dataInput.old_Password &&
      dataInput.password === dataInput.confirmPassword
    ) {
      const data = await changePass(variable);
      console.log(data);
      if (data.status) {
        setPending(false);
        MyAlert("succ", `${data.message}. Bạn sắp bị đăng xuất`, 3000);
        setTimeout(async () => {
          await logout();
          window.location.reload();
        }, 3100);
        return 0;
      } else {
        setPending(false);
        return MyAlert("err", `${data.message}`, 3500);
      }
    }
    if (
      !dataInput.password ||
      !dataInput.confirmPassword ||
      !dataInput.old_Password
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

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Đổi Mật Khẩu</h3>
              <i className="text-muted">(*) Vui lòng không bỏ trống</i>
              <form className="forms-sample">
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputPasswordOld">
                    Mật khẩu cũ (*)
                  </label>
                  <input
                    name="old_Password"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputPasswordOld"
                    placeholder="Mật khẩu cũ"
                    value={dataInput.old_Password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputPasswordNew">
                    Mật khẩu mới (*)
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputPasswordNew"
                    placeholder="Mật khẩu mới"
                    value={dataInput.password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmPasswor">
                    Xác thực mật khẩu mới (*)
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputConfirmPasswor"
                    placeholder="Xác thực mật khẩu mới"
                    value={dataInput.confirmPassword}
                    onChange={onChange}
                  />
                </div>

                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  🔑 Đổi mật khẩu
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

export default ChangePass;

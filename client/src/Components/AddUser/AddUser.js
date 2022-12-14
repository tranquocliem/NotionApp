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
    fullname: "",
    manv: "",
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
      fullname: dataInput.fullname,
      manv: dataInput.manv,
      email: dataInput.email,
      role: dataInput.role,
      department: departments.value ? departments.value : null,
      position: dataInput.position,
      sdt: dataInput.sdt,
      password: dataInput.password,
      confirmPassword: dataInput.confirmPassword,
    };
    console.log(variable);
    if (
      dataInput.username &&
      dataInput.fullname &&
      dataInput.manv &&
      dataInput.email &&
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
      !dataInput.fullname ||
      !dataInput.manv ||
      !dataInput.email ||
      !dataInput.role ||
      !dataInput.password ||
      !dataInput.confirmPassword
    ) {
      setPending(false);
      return MyAlert(
        "err",
        "Vui l??ng kh??ng b??? tr???ng c??c tr?????ng c?? d???u (*)",
        3500
      );
    }
    if (dataInput.password !== dataInput.confirmPassword) {
      setPending(false);
      return MyAlert("warr", "M???t kh???u x??c nh???n kh??ng ch??nh x??c", 3500);
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
              <h3 className="card-title">T???o T??i Kho???n M???i</h3>
              <i className="text-muted">(*) Vui l??ng kh??ng b??? tr???ng</i>
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
                  <label htmlFor="exampleInputUsername1">H??? v?? t??n (*)</label>
                  <input
                    name="fullname"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputFullname"
                    placeholder="H??? v?? t??n"
                    value={dataInput.fullname}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputMANV">M?? Nh??n Vi??n (*)</label>
                  <input
                    name="manv"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputMANV"
                    placeholder="M?? Nh??n Vi??n"
                    value={dataInput.manv}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputEmail1">E-mail (*)</label>
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
                    Lo???i t??i kho???n (*)
                  </label>
                  <select
                    className="form-control text-light"
                    id="exampleSelectGender"
                    name="role"
                    value={dataInput.role}
                    onChange={onChange}
                  >
                    <option value="" disabled>
                      Ch???n Lo???i T??i Kho???n
                    </option>
                    {user.role === "spadmin" && (
                      <>
                        <option value="spadmin">SPADMIN</option>
                        <option value="admin">ADMIN</option>
                      </>
                    )}

                    <option value="leader">Leader</option>
                    <option value="member">Nh??n Vi??n</option>
                  </select>
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleSelectDepartment">Ch???n b??? ph???n</label>
                  <Selects
                    handleDepartment={handleDepartment}
                    departments={departments}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmPosition">Ch???c v???</label>
                  <input
                    type="text"
                    name="position"
                    className="form-control text-light"
                    id="exampleInputConfirmPosition"
                    placeholder="Ch???c v???"
                    value={dataInput.position}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmSDT">S??? ??i???n tho???i</label>
                  <input
                    name="sdt"
                    type="number"
                    className="form-control text-light"
                    id="exampleInputConfirmSDT"
                    placeholder="S??? ??i???n tho???i"
                    value={dataInput.sdt}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputPassword1">M???t kh???u (*)</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputPassword1"
                    placeholder="M???t kh???u"
                    value={dataInput.password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputConfirmPassword1">
                    X??c th???c m???t kh???u (*)
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control text-light"
                    id="exampleInputConfirmPassword1"
                    placeholder="X??c th???c m???t kh???u"
                    value={dataInput.confirmPassword}
                    onChange={onChange}
                  />
                </div>

                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  + Th??m T??i Kho???n
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

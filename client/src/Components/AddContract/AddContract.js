import { useState } from "react";
import { MyAlert } from "../Alert/Alert";
import { Link, useParams } from "react-router-dom";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import { addContract } from "../../Service/ContractService";
registerLocale("vi", vi);

function AddContract(props) {
  const [pending, setPending] = useState(false);

  const [dataInput, setDataInput] = useState({
    typeContract: "",
  });

  const [startDateContract, setStartDateContract] = useState("");
  const [endDateContract, setEndDateContract] = useState("");

  const idUser = useParams().id;
  const userName = useParams().username;

  const onChange = (e) => {
    e.preventDefault();
    const newDataInput = { ...dataInput };
    newDataInput[e.target.name] = e.target.value;
    setDataInput(newDataInput);
  };

  const onChangeDateStart = (date) => {
    setStartDateContract(date);
  };

  const onChangeDateEnd = (date) => {
    setEndDateContract(date);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setPending(true);
    const variable = {
      typeContract: dataInput.typeContract,
      startDateContract,
      endDateContract,
      user: idUser,
    };
    if (dataInput.typeContract && startDateContract && endDateContract) {
      const data = await addContract(variable);
      if (data.status) {
        setPending(false);
        MyAlert("succ", `${data.message}`, 2500);
        props.history.push(`/chi-tiet-tai-khoan/${userName}/${idUser}`);
      } else {
        setPending(false);
        return MyAlert("err", `${data.message}`, 3500);
      }
    } else {
      setPending(false);
      return MyAlert("warr", "Bạn không được bỏ trống trường có dấu (*)");
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Tạo Hợp Đồng Mới</h3>
              <i className="text-muted">(*) Vui lòng không bỏ trống</i>
              <Link
                to={`/chi-tiet-tai-khoan/${userName}/${idUser}`}
                className="text-warning"
              >
                <p>{`Bạn đang tạo hợp đồng cho ${userName}`}</p>
              </Link>
              <form className="forms-sample">
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputName">Loại Hợp Đồng (*)</label>
                  <input
                    name="typeContract"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputName"
                    placeholder="Loại hợp đồng (vd: thử việc, chính thức)"
                    value={dataInput.typeContract}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputDateStart">
                    Ngày Bắt Đầu (*)
                  </label>
                  <DatePicker
                    name="startDate"
                    className="form-control"
                    selected={startDateContract}
                    value={startDateContract}
                    dateFormat="dd/MM/yyyy"
                    disabledKeyboardNavigation
                    placeholderText="Ngày Bắt Đầu Hợp Đồng"
                    onChange={onChangeDateStart}
                    locale="vi"
                    minDate={new Date("01/01/1970")}
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputDateStart">
                    Ngày Kết Thúc (*)
                  </label>
                  <DatePicker
                    name="endDate"
                    className="form-control"
                    selected={endDateContract}
                    value={endDateContract}
                    dateFormat="dd/MM/yyyy"
                    disabledKeyboardNavigation
                    placeholderText="Ngày Kết Thúc Hợp Đồng"
                    onChange={onChangeDateEnd}
                    locale="vi"
                    minDate={new Date("01/01/1970")}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  + Tạo Hợp Đồng
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

export default AddContract;

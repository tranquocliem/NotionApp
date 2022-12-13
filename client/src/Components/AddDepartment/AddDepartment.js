import { useState } from "react";
import { MyAlert } from "../Alert/Alert";
import { addDepartment } from "../../Service/DepartmentService";

function AddUser() {
  const [pending, setPending] = useState(false);

  const [dataInput, setDataInput] = useState({
    name: "",
  });

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
      name: dataInput.name,
    };
    if (dataInput.name) {
      const data = await addDepartment(variable);
      if (data.status) {
        setPending(false);
        return MyAlert("succ", `${data.message}`, 2500);
      } else {
        setPending(false);
        return MyAlert("err", `${data.message}`, 3500);
      }
    } else {
      setPending(false);
      return MyAlert("warr", "Bạn không được bỏ trống trường này");
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Tạo Bộ Phận Mới</h3>
              <i className="text-muted">(*) Vui lòng không bỏ trống</i>
              <form className="forms-sample">
                <div className="form-group text-left my-4">
                  <label htmlFor="exampleInputName">Tên bộ phận (*)</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control text-light"
                    id="exampleInputName"
                    placeholder="Tên bộ phận"
                    value={dataInput.name}
                    onChange={onChange}
                  />
                </div>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  + Thêm Bộ Phận
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

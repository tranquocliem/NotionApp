import { useContext, useEffect, useState } from "react";
import DataListDepartment from "./DataListDepartment";
import { getDepartment } from "../../Service/DepartmentService";
import { AuthContext } from "../../Context/AuthContext";

function ListDepartment() {
  const [listDepartment, setListDepartment] = useState([]);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function getAPI() {
      const data = await getDepartment();
      if (data) {
        setListDepartment(data);
      }
    }
    getAPI();
  }, []);

  const reloadDepartment = () => {
    async function getAPI() {
      const data = await getDepartment();
      if (data) {
        setListDepartment(data);
      }
    }
    getAPI();
  };

  return (
    <>
      {listDepartment.length > 0 ? (
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Danh Sách Tất Cả Bộ Phận</h4>
                <form className="nav-link p-0 w-50 search">
                  <input
                    type="search"
                    name="search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="form-control text-light"
                    placeholder="Tìm kiếm bộ phận"
                  />
                </form>
                <div className="table-responsive my-table">
                  <table className="table">
                    <thead>
                      <tr className="text-left">
                        <th className="text-center"> Tên bộ phận </th>
                        <th className="text-center"> Nhân sự </th>
                        <th className="text-center"> Người tạo </th>
                        {(user && user.role === "spadmin") ||
                        (user && user.role === "spadmin") ? (
                          <th className="text-center"> Hành động </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {listDepartment.map((data, i) => {
                        return (
                          <DataListDepartment
                            reloadDepartment={reloadDepartment}
                            department={data}
                            user={user}
                            key={i}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "100%", opacity: "75%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ListDepartment;

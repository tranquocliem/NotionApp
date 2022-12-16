import { useEffect, useState } from "react";
import { getAllAccount } from "../../Service/AccountService";
import DataMembers from "./DataMembers";

function AllMembers() {
  const [members, setMembers] = useState();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const getAPI = async () => {
      const data = await getAllAccount();
      if (data.status) {
        setPending(false);
        setMembers(data.dataUser);
      }
    };
    getAPI();
  }, []);

  const reloadTableData = () => {
    const getAPI = async () => {
      const data = await getAllAccount();
      if (data.status) {
        setPending(false);
        setMembers(data.dataUser);
      }
    };
    getAPI();
  };

  return (
    <>
      {!members ? (
        <div
          style={{ height: "100%", opacity: "75%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : members.length <= 0 ? (
        <div style={{ height: "100vh" }}>
          Không có nguồn nhân lực để hiển thị
        </div>
      ) : (
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Danh Sách Toàn Bộ Nhân Sự</h4>
                <div className="table-responsive my-table">
                  <table className="table">
                    <thead>
                      <tr className="text-left">
                        <th> Họ và Tên </th>
                        <th> Bộ Phận </th>
                        <th> Chức Vụ </th>
                        <th> E-mail </th>
                        <th> Số Điện Thoại </th>
                        <th> Trang Thái </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((data, i) => {
                        return (
                          <DataMembers
                            reloadTableData={reloadTableData}
                            member={data}
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
      )}
    </>
  );
}

export default AllMembers;

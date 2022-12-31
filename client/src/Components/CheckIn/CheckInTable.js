import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getMyCheckIn } from "../../Service/CheckInService";
import CheckInDataTable from "./CheckInDataTable";

function CheckInTable() {
  const [dataCheckIn, setDataCheckIn] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getAPICheckIn() {
      const data = await getMyCheckIn();
      if (data) {
        setDataCheckIn(data);
      }
    }
    getAPICheckIn();
  }, []);

  return (
    <>
      {!dataCheckIn ? (
        <div
          style={{ height: "100%", opacity: "75%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : dataCheckIn.length <= 0 ? (
        <div style={{ height: "100vh" }}>Không có dữ liệu</div>
      ) : (
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  Bảng Check In Của{" "}
                  {user.fullname ? user.fullname : "Người Ẩn Danh"}
                </h4>
                <div className="table-responsive my-table">
                  <table className="table">
                    <thead>
                      <tr className="text-left">
                        <th> Ngày Giờ Check In </th>
                        <th> Trạng Thái </th>
                        <th> Vị Trí </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataCheckIn.map((data, i) => {
                        if (data) {
                          return (
                            <CheckInDataTable dataCheckIn={data} key={i} />
                          );
                        } else {
                          return null;
                        }
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

export default CheckInTable;

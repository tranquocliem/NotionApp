import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCheckInByID } from "../../Service/CheckInService";
import DataTableCheckInID from "./DataTableCheckInID";

function TableCheckInID() {
  const [dataCheckIn, setDataCheckIn] = useState([]);
  const id = useParams().id;
  const name = useParams().name;
  console.log(id);
  useEffect(() => {
    async function getAPICheckIn() {
      const data = await getCheckInByID(id);
      if (data) {
        setDataCheckIn(data.dataCheckIn);
      }
    }
    getAPICheckIn();
  }, [id]);

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
                  Bảng Check In Của {name ? name : "Người Ẩn Danh"}
                </h4>
                <div className="table-responsive my-table">
                  <table className="table">
                    <thead>
                      <tr className="text-left">
                        <th> Ngày Giờ Check In </th>
                        <th> Loại Check In </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataCheckIn.map((data, i) => {
                        if (data) {
                          return (
                            <DataTableCheckInID dataCheckIn={data} key={i} />
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

export default TableCheckInID;

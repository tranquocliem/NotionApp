import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCheckOutByID } from "../../Service/CheckOutService";
import DataTableCheckOut from "./DataTableCheckOut";

function TableCheckOutID() {
  const [dataCheckOut, setDataCheckOut] = useState([]);
  const id = useParams().id;
  const name = useParams().name;
  useEffect(() => {
    async function getAPICheckOut() {
      const data = await getCheckOutByID(id);
      if (data) {
        setDataCheckOut(data.dataCheckOut);
      }
    }
    getAPICheckOut();
  }, [id]);

  return (
    <>
      {!dataCheckOut ? (
        <div
          style={{ height: "100%", opacity: "75%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : dataCheckOut.length <= 0 ? (
        <div style={{ height: "100vh" }}>Không có dữ liệu</div>
      ) : (
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  Bảng Check Out Của {name ? name : "Người Ẩn Danh"}
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
                      {dataCheckOut.map((data, i) => {
                        if (data) {
                          return (
                            <DataTableCheckOut dataCheckOut={data} key={i} />
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

export default TableCheckOutID;

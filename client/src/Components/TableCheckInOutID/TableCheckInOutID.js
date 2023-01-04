import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useParams } from "react-router-dom";
import { getCheckInByID } from "../../Service/CheckInService";
import { getCheckOutByID } from "../../Service/CheckOutService";
import DataTableCheckInID from "./DataTableCheckInID";
import DataTableCheckOut from "./DataTableCheckOut";

function TableCheckInOutID() {
  const [dataCheckIn, setDataCheckIn] = useState([]);
  const [dataCheckOut, setDataCheckOut] = useState([]);
  const [dataCheckInOut, setDataCheckInOut] = useState([]);
  const id = useParams().id;
  const name = useParams().name;

  const headers = [
    { label: "Ngày Giờ CheckIn", key: "dateTimeIn" },
    { label: "Trang Thái CheckIn", key: "typecheckin" },
    { label: "Ghi Chú CheckIn", key: "note" },
    { label: "Ngày Giờ CheckIn", key: "dateTimeOut" },
    { label: "Trang Thái CheckOut", key: "typecheckout" },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    async function getAPICheckIn() {
      const data = await getCheckInByID(id);
      if (data) {
        setDataCheckIn(data.dataCheckIn);
      }
    }
    async function getAPICheckOut() {
      const data = await getCheckOutByID(id);
      if (data) {
        setDataCheckOut(data.dataCheckOut);
      }
    }
    getAPICheckOut();
    getAPICheckIn();
  }, [id]);

  useEffect(() => {
    let dataInout = [];
    // eslint-disable-next-line array-callback-return
    dataCheckIn.map((cin) => {
      // eslint-disable-next-line array-callback-return
      dataCheckOut.map((cout) => {
        dataInout.push({
          dateTimeIn: cin.datetime,
          typecheckin: cin.typecheckin,
          note: cin.note,
          dateTimeOut: cout.datetime,
          typecheckout: cout.typecheckout,
        });
      });
    });
    setDataCheckInOut(dataInout);
  }, [dataCheckIn, dataCheckOut]);

  return (
    <>
      {!dataCheckIn && !dataCheckOut ? (
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
        <>
          <div className="row">
            <div className="col-12 grid-margin d-flex">
              <CSVLink
                className="btn btn-success"
                data={dataCheckInOut && dataCheckInOut}
                headers={headers}
                filename={`${name} CheckInOut.csv`}
              >
                <i className="fa-solid fa-file-csv"></i> Xuất Excel
              </CSVLink>
            </div>
          </div>
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
                          <th> Trạng Thái </th>
                          <th> Vị Trí </th>
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
                          <th> Trạng Thái </th>
                          <th> Vị Trí </th>
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
        </>
      )}
    </>
  );
}

export default TableCheckInOutID;

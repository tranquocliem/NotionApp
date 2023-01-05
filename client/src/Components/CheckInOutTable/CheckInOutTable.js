import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getMyCheckIn } from "../../Service/CheckInService";
import { getMyCheckOut } from "../../Service/CheckOutService";
import { CSVLink } from "react-csv";
import CheckInDataTable from "./CheckInDataTable";
import CheckOutDataTable from "./CheckOutDataTable";
function CheckInOutTable() {
  const [dataCheckIn, setDataCheckIn] = useState([]);
  const [dataCheckOut, setDataCheckOut] = useState([]);
  const [dataCheckInOut, setDataCheckInOut] = useState([]);
  const { user } = useContext(AuthContext);

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
      const data = await getMyCheckIn();
      if (data) {
        setDataCheckIn(data);
      }
    }
    async function getAPICheckOut() {
      const data = await getMyCheckOut();
      if (data) {
        setDataCheckOut(data);
      }
    }
    getAPICheckIn();
    getAPICheckOut();
  }, []);

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

  // useEffect(() => {
  //   console.log(dataCheckInOut);
  // }, [dataCheckInOut]);

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
        <>
          <div className="row">
            <div className="col-12 grid-margin d-flex">
              <CSVLink
                className="btn btn-success"
                data={dataCheckInOut && dataCheckInOut}
                headers={headers}
                filename={`${user.fullname} CheckInOut.csv`}
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
                    Bảng Check In Của{" "}
                    {user.fullname ? user.fullname : "Người Ẩn Danh"}
                  </h4>
                  <div className="table-responsive my-table">
                    <table className="table">
                      <thead>
                        <tr className="text-left">
                          <th> Ngày Giờ Check In </th>
                          <th> Trạng Thái </th>
                          <th> Ghi Chú </th>
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
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    Bảng Check Out Của{" "}
                    {user.fullname ? user.fullname : "Người Ẩn Danh"}
                  </h4>
                  <div className="table-responsive my-table">
                    <table className="table">
                      <thead>
                        <tr className="text-left">
                          <th> Ngày Giờ Check In </th>
                          <th> Trang Thái </th>
                          <th> Vị Trí </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataCheckOut.map((data, i) => {
                          if (data) {
                            return (
                              <CheckOutDataTable dataCheckOut={data} key={i} />
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

export default CheckInOutTable;

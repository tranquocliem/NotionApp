import "./index.css";
import TableLeader from "../Table/TableLeader/TableLeader";
import TableDev from "../Table/TableDev/TableDev";

function Home() {
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9 ">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">15 Tỷ VNĐ</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +50%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Tiềm Năng Tăng Trưởng
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">10 Tỷ VNĐ</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +11%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Doanh Thu Hiện Tại
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">14 Tỷ VNĐ</h3>
                    <p className="text-danger ml-2 mb-0 font-weight-medium">
                      -2.4%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-danger">
                    <i className="fa-solid fa-arrow-trend-down"></i>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">Cổ Phiếu</h6>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <div className="d-flex align-items-center align-self-start">
                    <h3 className="mb-0">11 Tỷ VNĐC</h3>
                    <p className="text-success ml-2 mb-0 font-weight-medium">
                      +3.5%
                    </p>
                  </div>
                </div>
                <div className="col-3">
                  <div className="icon icon-box-success ">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>
                </div>
              </div>
              <h6 className="text-muted font-weight-normal">
                Tiền Điện Tử (VNĐC)
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh Sách Trưởng Bộ Phân</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr className="text-left">
                      <th> Mã Số </th>
                      <th> Họ và Tên </th>
                      <th> Bộ Phần </th>
                      <th> Chức Vụ </th>
                      <th> Ngày Bắt Đầu Làm Việc </th>
                      <th> Số Điện Thoại </th>
                      <th> Trang Thái </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, i) => {
                      return <Datatable1 key={i} user={data} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <TableLeader />
      <TableDev />
    </>
  );
}

export default Home;

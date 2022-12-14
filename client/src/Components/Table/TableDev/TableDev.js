import datas from "../../Data/tabledev.json";
import DataTableDev from "./DataTableDev";

function TableDev() {
  return (
    <>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh Sách Nhân Viên Dev</h4>
              <div className="table-responsive my-table">
                <table className="table">
                  <thead>
                    <tr className="text-left">
                      <th> Mã Số </th>
                      <th> Họ và Tên </th>
                      <th> Bộ Phận </th>
                      <th> Chức Vụ </th>
                      <th> Ngày Bắt Đầu Làm Việc </th>
                      <th> Số Điện Thoại </th>
                      <th> Trang Thái </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, i) => {
                      return <DataTableDev key={i} user={data} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableDev;

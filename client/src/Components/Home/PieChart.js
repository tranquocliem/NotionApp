import Chart from "react-apexcharts";
import NoteChart from "./NoteChart";

function PieChart() {
  const colorNote = [
    "#00d25b",
    "#fc424a",
    "#ffab00",
    "#0090e7",
    "#DAE2B6",
    "#6D67E4",
    "#810CA8",
    "#FFBF00",
    "#FB2576",
    "#00FFF6",
    "#CF0A0A",
    "#FF74B1",
    "#A5BECC",
    "#125B50",
  ];
  const lblCharts = [
    "QA",
    "Content",
    "Design",
    "IT Support",
    "Accounting",
    "Social",
    "CSKH",
    "R & D",
    "HR",
    "Copywriting",
    "CEO",
    "DEV",
    "Event",
    "Project Manager",
  ];
  const seriesChart = [3, 5, 4, 3, 2, 4, 1, 4, 2, 3, 1, 5, 2, 1];
  return (
    <div className="row chart_component">
      <div className="col-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Biểu Đồ Nhân Viên</h4>
            <div className="myChart d-flex justify-content-center">
              <Chart
                className="chart_donut"
                type="donut"
                series={seriesChart}
                options={{
                  colors: colorNote,
                  legend: {
                    show: false,
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          total: {
                            show: true,
                            color: "#fff",
                            label: "Tổng",
                          },
                        },
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                  },
                  labels: lblCharts,
                }}
              />
            </div>
            <div className="bg-gray-dark d-flex d-md-block d- xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
              <div className="text-md-center text-xl-left">
                <h6 className="mb-1">Biểu đồ hình tròn</h6>
                <p className="text-muted mb-0">
                  Số lượng nhân viên theo bộ phận
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-center">
              <h4 className="card-title mb-2">Ghi Chú</h4>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="preview-list">
                  {lblCharts.map((lbl, i) => {
                    if (i <= 6) {
                      return (
                        <NoteChart
                          key={i}
                          nbIndex={i}
                          colorNote={colorNote[i]}
                          seri={seriesChart[i]}
                          lableCharts={lbl}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="preview-list">
                  {lblCharts.map((lbl, i) => {
                    if (i > 6) {
                      return (
                        <NoteChart
                          key={i}
                          nbIndex={i}
                          colorNote={colorNote[i]}
                          seri={seriesChart[i]}
                          lableCharts={lbl}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChart;

function DataTableCheckInID(props) {
  const dataCheckIn = props.dataCheckIn;

  return (
    <>
      <tr className="text-left">
        <td className="text-uppercase">
          {" "}
          {dataCheckIn.datetime ? dataCheckIn.datetime : "Không Xác Định"}{" "}
        </td>
        <td>
          {" "}
          {dataCheckIn.typecheckin
            ? dataCheckIn.typecheckin
            : "Không Xác Định"}{" "}
        </td>
        <td> {dataCheckIn.note ? dataCheckIn.note : "Không Xác Định"} </td>
        <td>
          {"Vĩ độ: "}
          {dataCheckIn.latitude ? dataCheckIn.latitude : "Không Xác Định"}
          {", Kinh độ: "}
          {dataCheckIn.longitude ? dataCheckIn.longitude : "Không Xác Định"}
        </td>
      </tr>
    </>
  );
}

export default DataTableCheckInID;

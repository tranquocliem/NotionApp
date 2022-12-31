function CheckOutDataTable(props) {
  const dataCheckOut = props.dataCheckOut;

  return (
    <>
      <tr className="text-left">
        <td>
          {" "}
          {dataCheckOut.datetime
            ? dataCheckOut.datetime
            : "Không Xác Định"}{" "}
        </td>
        <td>
          {" "}
          {dataCheckOut.typecheckin
            ? dataCheckOut.typecheckin
            : "Không Xác Định"}{" "}
        </td>
        <td>
          {"Vĩ độ: "}
          {dataCheckOut.latitude ? dataCheckOut.latitude : "Không Xác Định"}
          {", Kinh độ: "}
          {dataCheckOut.longitude ? dataCheckOut.longitude : "Không Xác Định"}
        </td>
      </tr>
    </>
  );
}

export default CheckOutDataTable;

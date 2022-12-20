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
      </tr>
    </>
  );
}

export default CheckOutDataTable;

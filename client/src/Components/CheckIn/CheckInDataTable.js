function CheckInDataTable(props) {
  const dataCheckIn = props.dataCheckIn;

  return (
    <>
      <tr className="text-left">
        <td>
          {" "}
          {dataCheckIn.datetime ? dataCheckIn.datetime : "Không Xác Định"}{" "}
        </td>
        <td>
          {" "}
          {dataCheckIn.typecheckin
            ? dataCheckIn.typecheckin
            : "Không Xác Định"}{" "}
        </td>
      </tr>
    </>
  );
}

export default CheckInDataTable;

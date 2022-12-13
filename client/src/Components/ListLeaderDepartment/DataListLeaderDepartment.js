function DataListLeaderDepartment(props) {
  const user = props.user;
  return (
    <>
      <tr className="text-left">
        <td> {user.id} </td>
        <td>
          <img
            //   className="img-xs rounded-circle"
            src={require(`../../img/${user.avatar}`)}
            alt=""
          />
          <span className="pl-2">{user.name}</span>
        </td>
        <td> {user.department} </td>
        <td> {user.position} </td>
        <td> {user.datastart} </td>
        <td> {user.sdt} </td>
        <td>
          <div className="badge badge-outline-success">{user.status}</div>
        </td>
      </tr>
    </>
  );
}

export default DataListLeaderDepartment;

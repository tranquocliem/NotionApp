import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function DataMembers(props) {
  const member = props.member;
  const { user } = useContext(AuthContext);

  return (
    <>
      <tr className="text-left">
        <td>
          <img
            //   className="img-xs rounded-circle"
            src={member.avatar}
            alt=""
          />
          <span className="pl-2">{member.fullname}</span>
        </td>
        <td>
          {" "}
          {member.department ? member.department.name : "Không Xác Định"}{" "}
        </td>
        <td> {member.position ? member.position : "Không Xác Định"} </td>
        <td> {member.email ? member.email : "Không Xác Định"} </td>
        <td> {member.sdt ? member.sdt : "Không Xác Định"} </td>
        <td>
          {member.status ? (
            <div className="badge badge-outline-success">Đang Làm</div>
          ) : (
            <div className="badge badge-outline-success">Nghỉ Việc</div>
          )}
        </td>
        {user.role && user.role === "spadmin" && member.role !== "spadmin" ? (
          <td>
            <button className="btn btn-danger">Xóa</button>
          </td>
        ) : null}
      </tr>
    </>
  );
}

export default DataMembers;

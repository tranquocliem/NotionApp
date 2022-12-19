import { immediateToast } from "izitoast-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { deleteAccount } from "../../Service/AccountService";
import { MyAlert } from "../Alert/Alert";

function DataMembers(props) {
  const member = props.member;
  const { user } = useContext(AuthContext);
  const [pendding, setPendding] = useState(false);

  const deleteAccout = () => {
    immediateToast("question", {
      message: `Bạn có muốn xóa tài khoản ${member.username}`,
      position: "center",
      title: "Cảnh Báo",
      timeout: 3500,
      color: "dark",
      icon: "fa fa-user",
      progressBarColor: "rgb(0, 255, 184)",
      buttons: [
        [
          "<button>Ok</button>",
          async function (instance, toast) {
            instance.hide(
              {
                transitionOut: "fadeOutUp",
              },
              toast
            );
            setPendding(true);
            const data = await deleteAccount(member._id);
            if (data && data.status) {
              MyAlert("succ", `Bạn đã xóa tài khoản ${member.username}`, 3500);
              setPendding(false);
              props.reloadTableData();
            } else {
              MyAlert(
                "err",
                `Bạn đã xóa không thành công tài khoản ${member.username}`,
                3500
              );
              setPendding(false);
            }
          },
        ],
        [
          "<button>Close</button>",
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: "fadeOutUp",
              },
              toast
            );
          },
        ],
      ],
    });
  };

  return (
    <>
      {pendding ? (
        <div className="loadingModal">
          <div className="spinner-border loading-spinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      <tr className="text-left">
        <td>
          <Link
            className="text-white"
            to={`/chi-tiet-tai-khoan/${member.username}/${member._id}`}
          >
            <img
              //   className="img-xs rounded-circle"
              src={member.avatar}
              alt=""
            />
            <span className="pl-2">
              {member.fullname ? member.fullname : "Không Xác Định"}
            </span>
          </Link>
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
            <button onClick={deleteAccout} className="btn btn-danger">
              Xóa
            </button>
          </td>
        ) : null}
      </tr>
    </>
  );
}

export default DataMembers;

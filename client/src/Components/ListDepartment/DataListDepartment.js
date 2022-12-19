import { immediateToast } from "izitoast-react";
import { useState } from "react";
import { deleteDepartment } from "../../Service/DepartmentService";
import { MyAlert } from "../Alert/Alert";

function DataListDepartment(props) {
  const department = props.department;
  const [pendding, setPendding] = useState(false);

  const deleteAccout = () => {
    immediateToast("question", {
      message: `Bạn có muốn xóa tài khoản ${department.name}`,
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
            const data = await deleteDepartment(department._id);
            if (data && data.status) {
              MyAlert("succ", `Bạn đã xóa tài khoản ${department.name}`, 3500);
              setPendding(false);
              props.reloadDepartment();
            } else {
              MyAlert(
                "err",
                `Bạn đã xóa không thành công tài khoản ${department.name}`,
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
        <td className="text-center"> {department.name} </td>
        <td className="text-center"> {department.users.length} </td>
        <td className="text-center">
          <img
            //   className="img-xs rounded-circle"
            src={
              department.writer && department.writer.avatar
                ? department.writer.avatar
                : ""
            }
            alt="Avatar"
          />
          <span className="pl-2">
            {department.writer && department.writer.fullname
              ? department.writer.fullname
              : ""}
          </span>
        </td>
        {(props.user && props.user.role === "spadmin") ||
        (props.user && props.user.role === "spadmin") ? (
          <td className="text-center">
            <button onClick={deleteAccout} className="btn btn-danger">
              Xóa
            </button>
          </td>
        ) : null}
      </tr>
    </>
  );
}

export default DataListDepartment;

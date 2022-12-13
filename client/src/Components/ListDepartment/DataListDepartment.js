import { MyAlert } from "../Alert/Alert";

function DataListDepartment(props) {
  const department = props.department;

  const showAlert = () => {
    MyAlert("que", `Bạn có muốn xóa bộ phận ${department.name}`, 3500);
  };

  return (
    <>
      <tr className="text-left">
        <td className="text-center"> {department.name} </td>
        <td className="text-center"> {department.users.length} </td>
        <td className="text-center">
          <img
            //   className="img-xs rounded-circle"
            src={department.writer.avatar}
            alt=""
          />
          <span className="pl-2">{department.writer.fullname}</span>
        </td>
        <td className="text-center">
          <button onClick={showAlert} className="btn btn-danger">
            Xóa
          </button>
        </td>
      </tr>
    </>
  );
}

export default DataListDepartment;

import React from "react";
import { Switch } from "react-router-dom";
import Login from "../Login/Login";
import PrivateRouter from "../../ProtectingRouter/PrivateRouter";
import UnPrivateRouter from "../../ProtectingRouter/UnPrivateRouter";
import Home from "../Home/Home";
import ListLeaderDepartment from "../ListLeaderDepartment/ListLeaderDepartment";
import MyAccount from "../MyAccount/MyAccount";
import AddUser from "../AddUser/AddUser";
import AddDepartment from "../AddDepartment/AddDepartment";
import ListDepartment from "../ListDepartment/ListDepartment";
import AllMembers from "../AllMembers/AllMembers";
import ChangePass from "../ChangPass/ChangePass";
import DetailsAccount from "../DetailsAccount/DetailsAccount";
import CheckIn from "../CheckIn/CheckIn";
import CheckOut from "../CheckOut/CheckOut";
import CheckInTable from "../CheckIn/CheckInTable";
import CheckOutTable from "../CheckOut/CheckOutTable";
import TableCheckInID from "../TableCheckInID/TableCheckInID";
import TableCheckOutID from "../TableCheckOutID/TableCheckOutID";
function DuongDanURL() {
  return (
    <>
      <Switch>
        <PrivateRouter
          roles={["spadmin", "admin", "leader", "member"]}
          exact
          path="/"
          component={Home}
        />
        <UnPrivateRouter path="/login" component={Login} />
        <PrivateRouter
          path="/tat-ca-nhan-vien"
          roles={["spadmin", "admin", "leader", "member"]}
          component={AllMembers}
        />
        <PrivateRouter
          roles={["spadmin", "admin", "leader", "member"]}
          path="/chi-tiet-tai-khoan/:username/:id"
          component={DetailsAccount}
        />
        <PrivateRouter
          roles={["spadmin", "admin", "leader", "member"]}
          path="/danh-sach-truong-bo-phan"
          component={ListLeaderDepartment}
        />
        <PrivateRouter
          roles={["spadmin", "admin", "leader", "member"]}
          path="/danh-sach-bo-phan"
          component={ListDepartment}
        />
        <PrivateRouter
          path="/tai-khoan/:username"
          roles={["spadmin", "admin", "leader", "member"]}
          component={MyAccount}
        />
        <PrivateRouter
          path="/them-tai-khoan"
          roles={["spadmin", "admin"]}
          component={AddUser}
        />
        <PrivateRouter
          path="/them-bo-phan"
          roles={["spadmin", "admin"]}
          component={AddDepartment}
        />
        <PrivateRouter
          path="/doi-mat-khau/:username"
          roles={["spadmin", "admin", "leader", "member"]}
          component={ChangePass}
        />
        <PrivateRouter
          path="/checkin"
          roles={["spadmin", "admin", "leader", "member"]}
          component={CheckIn}
        />
        <PrivateRouter
          path="/checkout"
          roles={["spadmin", "admin", "leader", "member"]}
          component={CheckOut}
        />
        <PrivateRouter
          path="/thong-tin-check-in/:user"
          roles={["spadmin", "admin", "leader", "member"]}
          component={CheckInTable}
        />
        <PrivateRouter
          path="/thong-tin-check-out/:user"
          roles={["spadmin", "admin", "leader", "member"]}
          component={CheckOutTable}
        />

        <PrivateRouter
          path="/check-in/:id/:name"
          roles={["spadmin", "admin", "leader", "member"]}
          component={TableCheckInID}
        />
        <PrivateRouter
          path="/check-out/:id/:name"
          roles={["spadmin", "admin", "leader", "member"]}
          component={TableCheckOutID}
        />

        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </>
  );
}

export default DuongDanURL;

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

        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </>
  );
}

export default DuongDanURL;

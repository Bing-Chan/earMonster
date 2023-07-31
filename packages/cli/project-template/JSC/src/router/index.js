import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { Session } from "@/utils/storge";
import { isEmpty } from "@/utils/validate";
import { login, isShowQuestionMark } from "@/utils/bridge";
import { fullRountMenu, orgLevelArr, constantRouterMap } from "./routerConfig";
import {
  queryEmpByUser,
  queryDatePermission,
  queryCzgKqPermissionByUser
} from "@/api";
Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: constantRouterMap
});

export default router;

function setWaterMark() {
  let { data } = Session.get("userInfo");
  Vue.prototype.watermark.set(data.userName + " " + data.employeeId);
}

router.beforeEach(async (to, from, next) => {
  if (isRenyuanliudong(to.path) && !Session.getJson('open')) {
    try {
      queryDatePermission().then(myres => {
        if (myres.status === 0) {
          var flagDate = {}
          if (myres.data.realUserOrgType == "HEAD" || myres.data.realUserOrgType == "MANAGE_AREA") {
            flagDate.LossFlag = 1;
            flagDate.Nopermission = false;
            Session.setJson("qiao", 1);
            Session.setJson("weiyi", 1);
          }
          if (myres.data.realUserOrgType == "REGION_MANAGE" || myres.data.realUserOrgType == "ZONE") {
            flagDate.LossFlag = 2;
            flagDate.Nopermission = false;
            Session.setJson("qiao", 2);
            Session.setJson("weiyi", 1);
          }
          if (myres.data.realUserOrgType == "TRANSFER_CENTER") {
            flagDate.LossFlag = 3;
            flagDate.Nopermission = false;
            Session.setJson("qiao", 3);
            Session.setJson("weiyi", 1);
          }
          if (myres.data.realUserOrgType == "HEAD" || myres.data.realUserOrgType == "MANAGE_AREA") {
            flagDate.KeepFlag = 1;
            flagDate.Nopermission = false;
          }
          if (myres.data.realUserOrgType == "REGION_MANAGE" || myres.data.realUserOrgType == "ZONE" || myres.data.realUserOrgType == "TRANSFER_CENTER") {
            flagDate.KeepFlag = 2;
            flagDate.Nopermission = false;
          }
          if (myres.data.realUserOrgType == "BRANCH") {
            flagDate.Nopermission = true;
          }
          Session.setJson("open", true);
          Session.setJson("Datepermission", flagDate);
        } else {
          console.log("读取接口失败");
        }
      })
    } catch (err) {
      console.log("err", err);
    }
  }

  console.log(to, "进入页面");
  Session.set("_path_", to.path);
  // let source = "";
  if (["/404", "/403"].includes(to.path)) {
    next();
  } else {
    // debugger
    // 是否传参处理
    const isQueryAuth =
      to.query.accessToken !== null && to.query.accessToken != undefined;
    // 是否在当前会话中
    let userInfo = Session.getJson("user");
    let isTokenChange = false;
    if (Session.get("token") || isQueryAuth) {
      // 设置token
      if (isQueryAuth) {
        if (to.query.accessToken != Session.get("token")) {
          isTokenChange = true;
        }
        Session.set("token", to.query.accessToken);
        isShowQuestionMark("1");
        Session.set("source", to.query.source);
      }

      // 无用户时、或者token发生变化
      if (!userInfo || isTokenChange) {
        const res = await queryEmpByUser();
        if (res.status == "0") {
          Session.setJson("user", res.data);
          userInfo = res.data;
        }
        if (isRenyuanliudong(to.path)  && !Session.getJson('open')) {
          const myres = await queryDatePermission();
          var flagDate = {};
          if (myres.status == "0") {
            if (
              myres.data.realUserOrgType == "HEAD" ||
              myres.data.realUserOrgType == "MANAGE_AREA"
            ) {
              flagDate.LossFlag = 1;
              flagDate.Nopermission = false;
              Session.setJson("qiao", 1);
              Session.setJson("weiyi", 1);
            }
            if (
              myres.data.realUserOrgType == "REGION_MANAGE" ||
              myres.data.realUserOrgType == "ZONE"
            ) {
              flagDate.LossFlag = 2;
              flagDate.Nopermission = false;
              Session.setJson("qiao", 2);
              Session.setJson("weiyi", 1);
            }
            if (myres.data.realUserOrgType == "TRANSFER_CENTER") {
              flagDate.LossFlag = 3;
              flagDate.Nopermission = false;
              Session.setJson("qiao", 3);
              Session.setJson("weiyi", 1);
            }
            if (
              myres.data.realUserOrgType == "HEAD" ||
              myres.data.realUserOrgType == "MANAGE_AREA"
            ) {
              flagDate.KeepFlag = 1;
              flagDate.Nopermission = false;
            }
            if (
              myres.data.realUserOrgType == "REGION_MANAGE" ||
              myres.data.realUserOrgType == "ZONE" ||
              myres.data.realUserOrgType == "TRANSFER_CENTER"
            ) {
              flagDate.KeepFlag = 2;
              flagDate.Nopermission = false;
            }
            if (myres.data.realUserOrgType == "BRANCH") {
              flagDate.Nopermission = true;
            }
            Session.setJson("open", true);
            Session.setJson("Datepermission", flagDate);
          }
        } else if (isCaozuogongKaoqin(to.path)) {
          const myres = await queryCzgKqPermissionByUser();
          if (myres.status == "0") {
            let whiteList = [
              "MANAGE_AREA",
              "REGION_MANAGE",
              "HEAD",
              "ZONE",
              "TRANSFER_CENTER"
            ];
            //无权限
            userInfo.pageNoPermission =
              !myres.data ||
              !myres.data.realUserOrgType ||
              myres.data.realUserOrgType == "" ||
              !whiteList.includes(myres.data.realUserOrgType);
          }
        }
      }

      setTimeout(() => {
        // 水印
        Vue.prototype.watermark.set(
          `${userInfo.userName || ""} ${userInfo.userCode || ""}`
        );

        // 埋点
        Vue.prototype.$track("user", {
          userName: userInfo.userName,
          userOrgCode: userInfo.orgCode,
          employeeId: userInfo.userCode
        });
      }, 1000);

      // 处理权限重定向
      const info = fullRountMenu.find(
        x => `${x.path}${x.redirect == "" ? "" : "/" + x.redirect}` == to.path
      );

      // 检查权限
      let blackList = ["personlosskeep"];
      let checkAuth = blackList.some(x => {
        return to.path.toLocaleLowerCase().includes(x);
      });

      // if (userInfo.userRole == "4" && checkAuth) {
      //   next({
      //     path: "/403",
      //     replace: true
      //   });
      // }

      if (checkNoPermission(to.path, userInfo)) {
        next({
          path: "/403",
          replace: true
        });
      } else {
        if (info) {
          //为空表示需要使用权限转发
          if (isEmpty(info.redirect)) {
            isShowQuestionMark("1");
            //重定向的对应页面
            let nextUrl = "";
            for (var key in orgLevelArr) {
              if (orgLevelArr[key] == userInfo.userRole) {
                nextUrl = key;
                break;
              }
            }

            if (nextUrl == "") {
              next({
                path: "/404"
              });
            } else {
              next({
                path: `${to.path}/${nextUrl}`,
                query: {
                  orgCode: userInfo.orgCode,
                  orgName: userInfo.orgName,
                  orgLevel: userInfo.userRole,
                  first: true
                },
                replace: true
              });
            }
          } else {
            next();
          }
        }
        next();
      }
    } else {
      next({
        path: "/404"
      });
    }
  }
});

//验证是否无权限
const checkNoPermission = (_path, _user) => {
  // 人员流动权限验证  只做逻辑迁移
  if (isRenyuanliudong(_path)) {
    return Session.get("Datepermission").Nopermission == true;
  } else if (isCaozuogongKaoqin(_path)) {
    //此处等待后端字段确定后修改
    return _user.pageNoPermission;
  }
  return false;
};

//是否人员流动页面
const isRenyuanliudong = _path => {
  return ["personlosskeep"].some(x =>
    _path.toLocaleLowerCase().includes(x.toLocaleLowerCase())
  );
};

//是否操作工考勤
const isCaozuogongKaoqin = _path => {
  return ["operatorWorkAttendance"].some(x =>
    _path.toLocaleLowerCase().includes(x.toLocaleLowerCase())
  );
};

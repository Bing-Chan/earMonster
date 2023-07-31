import axios from "axios";
import utils from "./utils";
import toast from "../components/common/Toast";
import Loading from "../components/common/Loading";
import { login } from "@/utils/bridge";

var envConfig = {
  uat: {
    VUE_APP_API: "10.130.11.148:8090/",
    type: "uat"
  },

  dev: {
    VUE_APP_API: "10.130.11.148:8090/",
    type: "dev"
  },

  pro: {
    VUE_APP_API: "jscapp.yto56.com.cn:8080/",
    type: "pro"
  }
};

function getEnv() {
  const host = window.location.host;

  if (location.search.indexOf("pro") >= 0) {
    return "pro";
  }

  if (host.match(/^localhost/i)) {
    return "dev";
  }
  //疫情期间过后恢复
  if (host.match(/^10.130.36.205/i)) {
    return "uat";
  }
  return "pro";
}

var config = envConfig[getEnv()];
window.envConfig = config;
var protocol = location.protocol;
const baseURL = protocol + "//" + config.VUE_APP_API;

const service = axios.create({
  baseURL,
  responseType: "json",
  timeout: 100000
});
// date类型参数格式化
function formatParams(data) {
  const toString = Object.prototype.toString;
  if (toString.call(data) !== "[object Object]") return {};
  for (const key in data) {
    if (
      data.hasOwnProperty(key) &&
      toString.call(data[key]) === "[object Date]"
    ) {
      let y = data[key].getFullYear();
      let m = data[key].getMonth() + 1;
      let d = data[key].getDate();
      data[key] = [y, m < 10 ? "0" + m : m, d < 10 ? "0" + d : d].join("-");
    }
  }
  return data;
}

// 总请求函数
function requestNew(option) {
  return new Promise((resolve, reject) => {
    if (
      utils.getSessionStorageNew("userInfo") != null &&
      utils.getSessionStorageNew("userInfo") != undefined
    ) {
      var { data: dataUserInfo } = utils.getSessionStorageNew("userInfo");
    }
    /**
     * 有些接口不需要 userOrgCode userOrgType  在option.data 中加入 userOrg: false 即可忽略 正常不传即可
     */
    let { userOrg = true, ...data } = option.data || {};
    let userOrgInfo = userOrg
      ? {
          userOrgCode:
            dataUserInfo != undefined ? dataUserInfo.realUserOrgCode : "",
          userOrgType:
            dataUserInfo != undefined ? dataUserInfo.realUserOrgType : "",
          regionManageList:
            dataUserInfo != undefined ? dataUserInfo.regionManageList : ""
        }
      : {};
    data = Object.assign(formatParams(data), userOrgInfo);
    //此判断用于新老框架兼容，api-brc服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-brc/brc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-csc/csc/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-csc/csc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-expj/expj/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-expj/expj/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    let params = {
      url: baseURL + option.url,
      method: "post",
      data,
      headers: {
        token: utils.getStorage("token")
      }
    };
    if (option.responseType) {
      params["responseType"] = "blob";
    } else {
      params["headers"]["Content-Type"] = "application/json;charset=utf-8";
    }

    service(params)
      .then(res => {
        if (res && res.data && res.status === 200) {
          resolve(res.data);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        Loading.close();
        if (error.response.status === 401) {
          //utils.removeSessionStorage('userInfo');
          login();
          toast(error.response.data.message);
          reject(error.response);
        } else {
          reject(error);
        }
      });
  });
}

// 总请求函数
function request(option) {
  return new Promise((resolve, reject) => {
    if (
      utils.getSessionStorageNew("userInfo") != null &&
      utils.getSessionStorageNew("userInfo") != undefined
    ) {
      var { data: dataUserInfo } = utils.getSessionStorageNew("userInfo");
    }
    /**
     * 有些接口不需要 userOrgCode userOrgType  在option.data 中加入 userOrg: false 即可忽略 正常不传即可
     */
    let { userOrg = true, ...data } = option.data || {};
    let userOrgInfo = userOrg
      ? {
          userOrgCode:
            dataUserInfo != undefined ? dataUserInfo.userOrgCode : "",
          userOrgType: dataUserInfo != undefined ? dataUserInfo.userOrgType : ""
        }
      : {};
    data = Object.assign(formatParams(data), userOrgInfo);

    //此判断用于新老框架兼容，api-brc服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-brc/brc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-csc/csc/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-csc/csc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-expj/expj/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-expj/expj/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    let params = {
      url: baseURL + option.url,
      method: "post",
      data,
      headers: {
        token: utils.getStorage("token")
      }
    };
    if (option.responseType) {
      params["responseType"] = "blob";
    } else {
      params["headers"]["Content-Type"] = "application/json;charset=utf-8";
    }

    service(params)
      .then(res => {
        if (res && res.data && res.status === 200) {
          resolve(res.data);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        Loading.close();
        if (error.response.status === 401) {
          //utils.removeSessionStorage('userInfo');
          login();
          toast(error.response.data.message);
          reject(error.response);
        } else {
          reject(error);
        }
      });
  });
}
// 食堂管理请求函数
function requestFood(option) {
  return new Promise((resolve, reject) => {
    if (
      utils.getSessionStorageNew("userInfo") != null &&
      utils.getSessionStorageNew("userInfo") != undefined
    ) {
      var { data: dataUserInfo } = utils.getSessionStorageNew("userInfo");
    }
    /**
     * 有些接口不需要 userOrgCode userOrgType  在option.data 中加入 userOrg: false 即可忽略 正常不传即可
     */
    let { userOrg = true, ...data } = option.data || {};
    let userOrgInfo = userOrg
      ? {
          userOrgCode:
            dataUserInfo != undefined ? dataUserInfo.realUserOrgCode : "",
          userOrgName:
            dataUserInfo != undefined ? dataUserInfo.realUserOrgName : "",
          userId: dataUserInfo != undefined ? dataUserInfo.employeeId : "",
          userName: dataUserInfo != undefined ? dataUserInfo.userName : ""
        }
      : {};
    data = Object.assign(formatParams(data), userOrgInfo);
    //此判断用于新老框架兼容，api-brc服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-brc/brc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-csc/csc/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-csc/csc/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    //此判断用于新老框架兼容，api-expj/expj/服务下的isPaging替换成paging
    if (
      option.url.indexOf("api-expj/expj/") !== -1 &&
      data.isPaging !== undefined
    ) {
      data.paging = !!data.isPaging;
      delete data.isPaging;
    }
    let params = {
      url: baseURL + option.url,
      method: "post",
      data,
      headers: {
        token: utils.getStorage("token")
      }
    };
    if (option.responseType) {
      params["responseType"] = "blob";
    } else {
      params["headers"]["Content-Type"] = "application/json;charset=utf-8";
    }

    service(params)
      .then(res => {
        if (res && res.data && res.status === 200) {
          resolve(res.data);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        Loading.close();
        if (error.response.status === 401) {
          //utils.removeSessionStorage('userInfo');
          login();
          toast(error.response.data.message);
          reject(error.response);
        } else {
          reject(error);
        }
      });
  });
}

//export default request
export { request, requestNew, requestFood };

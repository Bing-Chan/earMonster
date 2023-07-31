import axios from "axios";
import Qs from "qs";
import utils from "./utils";
import { Session } from "@/utils/storge";
import { login } from "@/utils/bridge";
import toast from "../components/common/Toast";

// 创建一个axios实例
const service = axios.create({
  baseURL: "/cockpit",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 100000
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 打开可能会报错 x-token不被允许
    config.headers["authorization"] = Session.get("token");
    config.headers["source"] = Session.get("source");
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  error => {
    // 请求错误做些事
    return Promise.reject(error);
  }
);

// 添加相应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    // if(res.message=="暂无权限"){
    //   localStorage.setItem("zanwu",res.data.status)

    // }else{
    //   localStorage.setItem("zanwu",res.data.status)
    // }

    // 如果返回的状态码不是200 就主动报错
    if (res.status != 0) {
      if (res.message != "暂无权限查看该人员档案") {
        throw "请求失败，" + res.message;
      }
    }
    return response.data;
  },
  error => {
    // 返回接口的错误信息
    // login();
    toast(error.response.data.message);
    return Promise.reject(error);
  }
);

export default service;

import { isJsonString } from "@/utils/validate";

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  // 设置临时缓存
  set(key, val) {
    window.sessionStorage.setItem(key.toString(), val);
  },
  // 获取临时缓存
  get(key) {
    let json = window.sessionStorage.getItem(key.toString());
    return json;
  },
  setJson(key, val) {
    window.sessionStorage.setItem(key.toString(), JSON.stringify(val));
  },
  // 获取临时缓存
  getJson(key) {
    let json = window.sessionStorage.getItem(key.toString());
    if (isJsonString(json)) {
      return JSON.parse(json);
    }
    return json;
  },
  // 移除临时缓存
  remove(key) {
    window.sessionStorage.removeItem(key.toString());
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear();
  }
};

import Vue from 'vue'
/**
 * 公用方法库 utils
 *
 * **/

const utils = {
  formatDate: function(date, fmt) {
    if (!date) {
      return "";
    }

    if (typeof date === "string") {
      if (date.indexOf(".") > -1) {
        // 有些日期接口返回带有.0。
        date = date.substring(0, date.indexOf("."));
      }
      // 解决IOS上无法从dateStr parse 到Date类型问题
      date = date.replace(/-/g, "/") + "";
    }

    let dateFormat = new Date(date);
    const o = {
      "M+": dateFormat.getMonth() + 1, //月份
      "d+": dateFormat.getDate(), //日
      "h+": dateFormat.getHours(), //小时
      "m+": dateFormat.getMinutes(), //分
      "s+": dateFormat.getSeconds(), //秒
      "q+": Math.floor((dateFormat.getMonth() + 3) / 3), //季度
      S: dateFormat.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (dateFormat.getFullYear() + "").substr(4 - RegExp.$1.length)
      );

    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );

    return fmt;
  },
  //实时搜索调用
  throttle: (function() {
    let timeoutId = 0;
    return function(method, delay) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(method, delay);
    };
  })(),
  getElementToPageTop(el) {
    if (el.parentElement) {
      return this.getElementToPageTop(el.parentElement) + el.offsetTop;
    }
    return el.offsetTop;
  },
  //时间T+或T-
  getDate(index) {
    let date = new Date(); //当前日期
    let newDate = new Date();
    newDate.setDate(date.getDate() + index);
    return newDate;
  },
  /**
   * 格式化万
   * @param val 数字
   * @param fixed 保留小数位
   * @param zerofill 小数位是否补0
   * @returns {string}
   */
  formatTenThousand(val, fixed = 2, zerofill = false) {
    if (!val) {
      return "0";
    }
    if (val === "-") return val;
    let minus = "";
    if (val.toString().indexOf("-") > -1) {
      minus = "-";
    }
    let vals = parseFloat(val.toString().replace(/-/g, ""));
    if (vals < 10000) {
      return minus + vals;
    } else if (vals >= 10000 && vals < 100000000) {
      return minus + this.roundFixed(vals / 10000, fixed, zerofill) + "万";
    } else if (vals >= 100000000) {
      return minus + this.roundFixed(vals / 100000000, fixed, zerofill) + "亿";
    }
  },
  /***
   * 处理日期类型转换
   */
  toConvertDateType(val) {
    return val == "date" ? "day" : val;
  },
  /**
   * 四舍五入
   * @param num 数字
   * @param fixed 保留小数位
   * @param zerofill 小数位是否补0
   * @returns {string}
   */
  roundFixed(num, fixed, zerofill) {
    let pos = num.toString().indexOf("."),
      decimal = num.toString().length - pos - 1,
      integer = num * Math.pow(10, decimal),
      divisor_1 = Math.pow(10, decimal - fixed),
      divisor_2 = Math.pow(10, fixed);
    if (zerofill) {
      let val = (Math.round(integer / divisor_1) / divisor_2).toString();
      let rs = val.indexOf(".");
      if (rs < 0 && fixed !== 0) {
        rs = val.length;
        val += ".";
      }
      while (val.length <= rs + fixed) {
        val += "0";
      }
      return val;
    } else {
      return Math.round(integer / divisor_1) / divisor_2; // 如果末位不需要补0直接返回即可
    }
  },

  //  获取url参数
  parseQuery(qs = "") {
    const obj = {};
    const params = qs.replace(/^(\?|#)/, "").split(/&amp;|&/);
    for (let i = 0; i < params.length; i++) {
      if (params[i]) {
        let index = params[i].indexOf("=");
        if (index === -1) index = params[i].length;
        const key = params[i].substring(0, index);
        const val = params[i].substring(index + 1);
        if (obj.hasOwnProperty(key)) {
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
          obj[key].push(decodeURIComponent(val));
        } else {
          obj[key] = decodeURIComponent(val);
        }
      }
    }
    return obj;
  },
  //从search取值
  getQueryString: url => {
    let obj = {};
    if (url.indexOf("?") == -1) return obj;
    let par = url.split("?")[1].split("&");
    par.forEach(item => {
      let query = item.split("=");
      obj[query[0]] = query[1];
    });
    return obj;
  },

  //  异步加载js
  loadJs(src, attrs = {}) {
    return new Promise((resolve, reject) => {
      const ref = document.getElementsByTagName("script")[0];
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      for (let key in attrs) {
        script.setAttribute(key, attrs[key]);
      }
      ref.parentNode.insertBefore(script, ref);
      script.onload = resolve;
      script.onerror = reject;
    });
  },

  //utf8转base64
  utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  },

  //base64转utf8
  b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  },

  noop() {},

  stringifyQuery(obj) {
    let result = "";
    for (let key in obj)
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (Array.isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            result += "&" + key + "=" + encodeURIComponent(val[i]);
          }
        } else {
          result += "&" + key + "=" + encodeURIComponent(val);
        }
      }
    return result.replace("&", "?");
  },

  getSearchValue(url) {
    let obj = {};
    if (url.indexOf("?") == -1) return obj;
    let par = url.split("?")[1].split("&");
    par.forEach(item => {
      let query = item.split("=");
      obj[query[0]] = query[1];
    });
    return obj;
  },

  //设置localStorage
  setStorage(key, val) {
    window.localStorage.setItem(key, this.serialize(val));
  },

  //获取localStorage
  getStorage(key) {
    return this.deserialize(window.localStorage.getItem(key));
  },

  //删除localStorage
  removeStorage(key) {
    if (!key) return;
    return window.localStorage.removeItem(key);
  },

  serialize(val) {
    return JSON.stringify(val);
  },

  deserialize(val) {
    if (typeof val != "string") {
      return undefined;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return val || undefined;
    }
  },

  //设置sessionStorage
  setSessionStorageNew(name, data) {
    window.sessionStorage.setItem(name, this.serialize(data));
  },

  //获取sessionStorage
  getSessionStorageNew(name) {
    return this.deserialize(window.sessionStorage.getItem(name));
  },

  //删除sessionStorage
  removeSessionStorageNew(name) {
    if (!name) return;
    return window.sessionStorage.removeItem(name);
  },

  //设置sessionStorage
  setSessionStorage(name, data) {
    window.sessionStorage.removeItem(name);
    window.sessionStorage.setItem(name, JSON.stringify(data));
  },

  //获取sessionStorage
  getSessionStorage(name) {
    if (typeof name == "string") {
      return window.sessionStorage.getItem(name);
    } else {
      return JSON.parse(window.sessionStorage.getItem(name));
    }
  },

  //删除sessionStorage
  removeSessionStorage(name) {
    window.sessionStorage.removeItem(name);
  },

  /**
   * 对象转url参数
   * @param {*} data
   * @param {*} isPrefix
   */
  urlencode(data, isPrefix = false) {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    for (let key in data) {
      let value = data[key];
      // 去掉为空的参数
      if (["", undefined, null].includes(value)) {
        continue;
      }
      if (value.constructor === Array) {
        value.forEach(_value => {
          _result.push(
            encodeURIComponent(key) + "[]=" + encodeURIComponent(_value)
          );
        });
      } else {
        _result.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  },
  /**
   * 兼容3条折线图标题
   * @param yData  y轴数据
   * @param format 需要展示的格式，每个栏目的单位和数据可能需要格式化的需求不一样，根据自己栏目进行扩展switch
   * @returns {Array[]} 返回的数组
   */
  publicChartLineLabel(yData, format) {
    if (yData.length === 1 || yData.length === 2) {
      return this.lineLabelPosition(yData, format);
    }
    if (yData.length === 3) {
      return this.carUsageLineLabelPositionNew(yData, format);
    }
  },
  /**
   * 折线图数组比较大小显示上下标题
   * @param yData  y轴数据
   * @param format 需要展示的格式，每个栏目的单位和数据可能需要格式化的需求不一样，根据自己栏目进行扩展switch
   * @returns {Array[]} 返回的数组
   */
  lineLabelPosition(yData, format) {
    //debugger
    let arrOne = yData[0];
    let arrTwo = yData[1];
    let rotate = null;
    let rotateOne = null;
    let rotateTwo = null;
    let formatter = null;

    // let MaxW = false // 是否有大于 1w的数据,
    // yData.map(list => {
    //   list.map(v => {
    //     if (v >= 10000) MaxW = true
    //   })
    // })
    switch (format) {
      case "W": // 格式化‘万’
        formatter = function(params) {
          if (params.data.value >= 10000 && params.data.value < 1000000) {
            let percents = Math.round((params.data.value / 10000) * 100) / 100;
            return percents;
          } else if (params.data.value >= 1000000) {
            let million = Math.round(params.data.value / 10000);
            return million;
          } else {
            return params.data.value;
          }
        };
        break;
      default:
        // formatter = function(params) {
        //   // 判断是否有大于 1w的数据, 进行处理
        //   if (MaxW) return Math.round((params.value / 10000) * 100) / 100;
        //   else return params.value;
        // };
    }
    if (yData.length === 2) {
      arrOne.forEach((value, index) => {
        if (
          value > 10000 &&
          (value / 10000).toString().split(".")[0].length >= 5
        ) {
          rotateOne = true;
        }
      });
      arrTwo.forEach((value, index) => {
        if (
          value > 10000 &&
          (value / 10000).toString().split(".")[0].length >= 5
        ) {
          rotateTwo = true;
        }
      });
      if (rotateOne || rotateTwo) {
        rotate = "35";
      }
      let newArr = [];
      let newArr1 = [];
      let newArr2 = [];

      for (let i in arrOne) {
        for (let k in arrTwo) {
          if (i === k) {
            if (Number(arrOne[i]) >= Number(arrTwo[k])) {
              let isTopBoolOne = this.getEcharsBool(arrOne[i], arrTwo[k]);
              newArr1.push({
                value: arrOne[i],
                label: {
                  show: true,
                  distance: 10,
                  rotate: rotate,
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
              if (isTopBoolOne) {
                if (Number(arrTwo[k]) === 0) {
                  newArr2.push({
                    value: arrTwo[k],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "top",
                      formatter: formatter
                    }
                  });
                } else {
                  newArr2.push({
                    value: arrTwo[k],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "bottom",
                      formatter: formatter
                    }
                  });
                }
              } else {
                newArr2.push({
                  value: arrTwo[k],
                  label: {
                    show: true,
                    distance: 10,
                    rotate: rotate,
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              }
            } else {
              let isTopBoolTwo = this.getEcharsBool(arrTwo[k], arrOne[i]);
              if (isTopBoolTwo) {
                if (Number(arrOne[i]) === 0) {
                  newArr1.push({
                    value: arrOne[i],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "top",
                      formatter: formatter
                    }
                  });
                } else {
                  newArr1.push({
                    value: arrOne[i],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "bottom",
                      formatter: formatter
                    }
                  });
                }
              } else {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    rotate: rotate,
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              }

              newArr2.push({
                value: arrTwo[k],
                label: {
                  show: true,
                  distance: 10,
                  rotate: rotate,
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
            }
          }
        }
      }
      newArr = [newArr1, newArr2];
      return newArr;
    }
    if (yData.length === 1) {
      let newArr = [];
      let newArr1 = [];
      for (let i in arrOne) {
        newArr1.push({
          value: arrOne[i],
          label: {
            show: true,
            distance: 10,
            rotate: rotate,
            // offset: [10,-5],
            fontSize: 11,
            position: "top",
            formatter: formatter
          }
        });
      }
      newArr = [newArr1];

      return newArr;
    }
  },
  lineBarLabelPosition(yData) {
    let arrOne = yData[0];
    let arrTwo = yData[1];
    let rotate = null;
    let rotateOne = null;
    let rotateTwo = null;
    let formatter = null;
    if (yData.length === 2) {
      arrOne.forEach((value, index) => {
        if (
          value > 10000 &&
          (value / 10000).toString().split(".")[0].length >= 5
        ) {
          rotateOne = true;
        }
      });
      arrTwo.forEach((value, index) => {
        if (
          value > 10000 &&
          (value / 10000).toString().split(".")[0].length >= 5
        ) {
          rotateTwo = true;
        }
      });
      if (rotateOne || rotateTwo) {
        rotate = "35";
      }
      let newArr = [];
      let newArr1 = [];
      let newArr2 = [];

      for (let i in arrOne) {
        for (let k in arrTwo) {
          if (i === k) {
            if (Number(arrOne[i]) >= Number(arrTwo[k])) {
              let isTopBoolOne = this.getEcharsBool(arrOne[i], arrTwo[k]);
              newArr1.push({
                value: arrOne[i],
                label: {
                  show: true,
                  distance: 10,
                  rotate: rotate,
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
              if (isTopBoolOne) {
                if (Number(arrTwo[k]) === 0) {
                  newArr2.push({
                    value: arrTwo[k],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "top",
                      formatter: formatter
                    }
                  });
                } else {
                  newArr2.push({
                    value: arrTwo[k],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "center",
                      formatter: formatter
                    }
                  });
                }
              } else {
                newArr2.push({
                  value: arrTwo[k],
                  label: {
                    show: true,
                    distance: 10,
                    rotate: rotate,
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              }
            } else {
              let isTopBoolTwo = this.getEcharsBool(arrTwo[k], arrOne[i]);
              if (isTopBoolTwo) {
                if (Number(arrOne[i]) === 0) {
                  newArr1.push({
                    value: arrOne[i],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "top",
                      formatter: formatter
                    }
                  });
                } else {
                  newArr1.push({
                    value: arrOne[i],
                    label: {
                      show: true,
                      distance: 10,
                      rotate: rotate,
                      // offset: [-10,5],
                      fontSize: 11,
                      position: "bottom",
                      formatter: formatter
                    }
                  });
                }
              } else {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    rotate: rotate,
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              }

              newArr2.push({
                value: arrTwo[k],
                label: {
                  show: true,
                  distance: 10,
                  rotate: rotate,
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
            }
          }
        }
      }
      newArr = [newArr1, newArr2];
      return newArr;
    }
  },
  /**
   * 针对用车量三条线特殊处理（第二条第三条数据比第一条大很多）
   * @param yData  y轴数据
   * @param format 需要展示的格式，每个栏目的单位和数据可能需要格式化的需求不一样，根据自己栏目进行扩展switch
   * @returns {Array[]} 返回的数组
   */
  carUsageLineLabelPosition(yData, format) {
    let arrOne = yData[0];
    let arrTwo = yData[1];
    let arrThree = yData[2];
    let formatter;
    switch (format) {
      case "W": // 格式化‘万’
        formatter = function(params) {
          if (params.data.value >= 10000 && params.data.value < 1000000) {
            let percents = Math.round((params.data.value / 10000) * 100) / 100;
            return percents;
          } else if (params.data.value >= 1000000) {
            let million = Math.round(params.data.value / 10000);
            return million;
          } else {
            return params.data.value;
          }
        };
        break;

      default:
        formatter = null;
    }

    let newArr = [];
    let newArr1 = [];
    let newArr2 = [];
    let newArr3 = [];

    for (let i in arrOne) {
      for (let k in arrTwo) {
        for (let t in arrThree) {
          if (i === k && k === t) {
            let isTopBool =
              Number(arrThree[t]) - Number(arrOne[i]) < Number(arrThree[t]) / 2;
            if (Number(arrTwo[k]) >= Number(arrThree[t])) {
              if (!isTopBool) {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    // rotate: "35",
                    // offset: [10,-5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              } else {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    // rotate: "35",
                    // offset: [10,-5],
                    fontSize: 11,
                    position: "bottom",
                    formatter: formatter
                  }
                });
              }

              newArr2.push({
                value: arrTwo[k],
                label: {
                  show: true,
                  distance: 10,
                  // rotate: "35",
                  // offset: [-10,5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
              newArr3.push({
                value: arrThree[t],
                label: {
                  show: true,
                  distance: 10,
                  // rotate: "35",
                  // offset: [-10,5],
                  fontSize: 11,
                  position: "bottom",
                  formatter: formatter
                }
              });
            } else {
              if (!isTopBool) {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    // rotate: "35",
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "top",
                    formatter: formatter
                  }
                });
              } else {
                newArr1.push({
                  value: arrOne[i],
                  label: {
                    show: true,
                    distance: 10,
                    // rotate: "35",
                    // offset: [-10,5],
                    fontSize: 11,
                    position: "bottom",
                    formatter: formatter
                  }
                });
              }

              newArr2.push({
                value: arrTwo[k],
                label: {
                  show: true,
                  distance: 10,
                  // rotate: "35",
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "bottom",
                  formatter: formatter
                }
              });
              newArr3.push({
                value: arrThree[t],
                label: {
                  show: true,
                  distance: 10,
                  // rotate: "35",
                  // offset: [10,-5],
                  fontSize: 11,
                  position: "top",
                  formatter: formatter
                }
              });
            }
          }
        }
      }
    }
    newArr = [newArr1, newArr2, newArr3];

    return newArr;
  },

  getEcharsBool(v1, v2) {
    let plusValue = Number(v1) - Number(v2);
    let averValue = Number(v1) / 2;
    let isTopBool = Math.abs(plusValue) <= averValue;
    return isTopBool;
  },
  //  正负颜色变换（正绿负红）
  filterColor(val, flag = "") {
    if (val === undefined || val === null) {
      return;
    }
    let v = val.toString();
    if (
      v === "0" ||
      v === "0.0" ||
      v === "0.00" ||
      v === "0.000" ||
      v === "0%"
    ) {
      return "0";
    } else if (v.indexOf("-") > -1) {
      return ' <span class="red">' + this.roundFixed(v, 2) + flag + "</span>";
    } else if (v.indexOf("+") > -1) {
      return ' <span class="green">' + this.roundFixed(v, 2) + flag + "</span>";
    } else {
      return (
        ' <span class="green" >' + this.roundFixed(v, 2) + flag + "</span>"
      );
    }
  },
  filterColorByRate(val) {
    return this.filterColor(val.replace("%", ""), "%");
  },
  /***
   * 正确、错误、异常判断
   */
  filterFlagColor(val) {
    if (val=="正常") {
     return ' <span class="green">' + val + "</span>";
   } else {
     return ' <span class="red">' +val + "</span>";
   }
 },
  filterColorByNumber(val) {
    return this.filterColor(val);
  },
  //  环比差颜色变换（负绿正红）
  relativeColor(val) {
    if (val === undefined || val === null) {
      return;
    }
    let v = val.toString();
    if (
      v === "0" ||
      v === "0.0" ||
      v === "0.00" ||
      v === "0.000" ||
      v === "0%"
    ) {
      return "0";
    } else if (v.indexOf("-") > -1) {
      return ' <span class="green">' + this.formatTenThousand(v) + "</span>";
    } else if (v.indexOf("+") > -1) {
      return ' <span class="red">' + this.formatTenThousand(v) + "</span>";
    } else {
      return ' <span class="red"> +' + this.formatTenThousand(v) + "</span>";
    }
  },
  getEnv() {
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
  },
  /**
   * 整队 三条折线图处理
   */
  carUsageLineLabelPositionNew(yData, format) {
    if (!yData || yData.length != 3) return yData;
    let formatter;
    switch (format) {
      case "W": // 格式化‘万’
        formatter = function(params) {
          if (params.data.value >= 10000 && params.data.value < 1000000) {
            let percents = Math.round((params.data.value / 10000) * 100) / 100;
            return percents;
          } else if (params.data.value >= 1000000) {
            let million = Math.round(params.data.value / 10000);
            return million;
          } else {
            return params.data.value;
          }
        };
        break;

      default:
        formatter = null;
    }
    const bottomLabel = {
      distance: 10,
      rotate: 10,
      positon: "bottom",
      offset: [0, 30],
      formatter,
      show: true
    };
    const topLabel = {
      distance: 5,
      rotate: 10,
      positon: "top",
      formatter,
      show: true
    };

    let [a1, a2, a3] = yData.map(arr => arr.map(parseFloat));

    let minNum = Math.min.apply(null, [...a1, ...a2, ...a3]),
      maxNum = Math.max.apply(null, [...a1, ...a2, ...a3]);

    for (let i = 0, len = a1.length; i < len; i++) {
      let n1 = a1[i],
        n2 = a2[i],
        n3 = a3[i],
        [_min, _mid, _max] = [
          { n: n1, v: a1 },
          { n: n2, v: a2 },
          { n: n3, v: a3 }
        ].sort((a, b) => a.n - b.n);

      /**
       * 区分最大 中间 和 最小的数组  中间会出现两者相等情况 就是要保证每个都是独立的 都能照顾到
       */
      let maxArr = _max.v,
        midArr = _mid.v,
        minArr = _min.v,
        min = _min.n,
        max = _max.n,
        mid = _mid.n;

      // 找到最大的 map[max]
      maxArr[i] = { value: max, label: topLabel };
      /**
       * 最小的
       *
       * 最小的展示是否在最下面
       */
      // const isBottom = (min - minNum) > (min/10);

      const isBottom = min > maxNum / 10;

      minArr[i] = { value: min, label: isBottom ? bottomLabel : topLabel };

      /**
       * 中间的
       * 如果最小的数据显示再下面 则判断中间显示的距离
       *
       * 判断中间的距离上边和下边的距离哪个大
       */
      const isTop = max - mid - (mid - min) > 0;
      if (isBottom) {
        midArr[i] = { value: mid, label: isTop ? topLabel : bottomLabel };
      } else {
        midArr[i] = { value: mid, label: topLabel };
      }

      if (max === mid) midArr[i] = { value: mid, label: topLabel };

      if (max === min) {
        midArr[i] = { value: mid, label: topLabel };
        minArr[i] = { value: min, label: topLabel };
      }
    }

    return [a1, a2, a3];
  },

  /**
   * 据长度截取字符串，超长部分追加…
   * @param str 对象字符串
   * @param len 目标字节长度
   * @returns {string|*} 处理结果字符串
   */

  cutString(str, len) {
    //length属性读出来的汉字长度为1

    if (str.length * 2 <= len) {
      return str;
    }
    let strlen = 0;

    let s = "";

    for (let i = 0; i < str.length; i++) {
      s = s + str.charAt(i);
      if (str.charCodeAt(i) > 128) {
        strlen = strlen + 2;
        if (strlen >= len) {
          return s.substring(0, s.length - 1) + "...";
        }
      } else {
        strlen = strlen + 1;
        if (strlen >= len) {
          return s.substring(0, s.length - 2) + "...";
        }
      }
    }
    return s;
  },
  formatfoodDate(date) {
    let y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    return `${y}-${m}-${d}`;
  },
  setPageTitle(title){
    //设置标题
    document.title = title;
    if (Vue.prototype.$dd.env.platform !== "notInDingTalk") {
      Vue.prototype.$dd.ready(function() {;
        Vue.prototype.$dd.biz.navigation.setTitle({
          title: title
        });
      });
    }
  }
};

export default utils;

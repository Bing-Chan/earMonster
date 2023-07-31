"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectValueEqual = exports.judementSameArr = void 0;
/**
 * 判断两数组是否相同
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
function judementSameArr(news, old) {
    let count = 0;
    const leng = old.length;
    for (let i in old) {
        for (let j in news) {
            if (old[i] === news[j])
                count++;
        }
    }
    return count === leng ? true : false;
}
exports.judementSameArr = judementSameArr;
/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
function isObjectValueEqual(a, b) {
    if (!a || !b)
        return false;
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    if (aProps.length != bProps.length)
        return false;
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        let propA = a[propName];
        let propB = b[propName];
        if (!b.hasOwnProperty(propName))
            return false;
        if (propA instanceof Object) {
            if (!isObjectValueEqual(propA, propB))
                return false;
        }
        else if (propA !== propB) {
            return false;
        }
    }
    return true;
}
exports.isObjectValueEqual = isObjectValueEqual;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptByMd5 = exports.decodeByBase64 = exports.encryptByBase64 = exports.AesEncryption = void 0;
const aes_1 = require("crypto-js/aes");
const enc_utf8_1 = require("crypto-js/enc-utf8");
const pad_pkcs7_1 = require("crypto-js/pad-pkcs7");
const mode_ecb_1 = require("crypto-js/mode-ecb");
const md5_1 = require("crypto-js/md5");
const enc_utf8_2 = require("crypto-js/enc-utf8");
const enc_base64_1 = require("crypto-js/enc-base64");
class AesEncryption {
    constructor(opt = {}) {
        const { key, iv } = opt;
        if (key) {
            this.key = (0, enc_utf8_1.parse)(key);
        }
        if (iv) {
            this.iv = (0, enc_utf8_1.parse)(iv);
        }
    }
    get getOptions() {
        return {
            mode: mode_ecb_1.default,
            padding: pad_pkcs7_1.default,
            iv: this.iv,
        };
    }
    encryptByAES(cipherText) {
        return (0, aes_1.encrypt)(cipherText, this.key, this.getOptions).toString();
    }
    decryptByAES(cipherText) {
        return (0, aes_1.decrypt)(cipherText, this.key, this.getOptions).toString(enc_utf8_2.default);
    }
}
exports.AesEncryption = AesEncryption;
function encryptByBase64(cipherText) {
    return enc_utf8_2.default.parse(cipherText).toString(enc_base64_1.default);
}
exports.encryptByBase64 = encryptByBase64;
function decodeByBase64(cipherText) {
    return enc_base64_1.default.parse(cipherText).toString(enc_utf8_2.default);
}
exports.decodeByBase64 = decodeByBase64;
function encryptByMd5(password) {
    return (0, md5_1.default)(password).toString();
}
exports.encryptByMd5 = encryptByMd5;

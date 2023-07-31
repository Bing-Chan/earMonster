function isPhoneNumber(text) {
    var reg = /^1\d{10}$/
    return reg.test(text)
}

function isChinese(text) {
    var reg = /^[\u4e00-\u9fa5]{1,7}\u00b7?[\u4e00-\u9fa5]{1,8}$/
    return reg.test(text)
}

function isEnglish(text) {
    var reg = /^[a-z][a-z.\u00b7]{2,29}$/i
    return reg.test(text)
}
// 邮编
function isZip(text) {
    var reg = /^\d{6}$/
    return reg.test(text)
}

function isIdCard(idCard) {
    var num = idCard.toLowerCase().match(/\w/g)
    if (idCard.match(/^\d{17}[\dx]$/i)) {
        var sum = 0, times = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        for (var i = 0; i < 17; i++) {
            sum += parseInt(num[i], 10) * times[i]
        }
        if ('10x98765432'.charAt(sum % 11) != num[17]) {
            return false
        }
        return !!idCard.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, '$1-$2-$3')
    }
    if (idCard.match(/^\d{15}$/)) {
        return !!idCard.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, '19$1-$2-$3')
    }
    return false
}

function isJsonString(str) {
    if (typeof str == 'string') {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch (e) {
            return false;
        }
    }
    return false;
}

function isEmpty(text) {
    return /^\s*$/.test(text)
}

export { isPhoneNumber, isChinese, isEnglish, isZip, isIdCard, isEmpty,isJsonString }

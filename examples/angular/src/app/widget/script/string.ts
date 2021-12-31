interface String {
    toDate(format: String): Date;
    encode(): string;
    decode(): string;
    trimLeftRight(ch: String): string;
    trimLeft(str: String, ch: String): string;
    trimRight(str: String, ch: String): string;
    padLeft(ch: String, len: number): string;
    padRight(ch: String, len: number): string;
    isDigital(): Boolean;
    isMobile(): Boolean;
}
/// <summary>
/// 将日期字符串转换为日期对象
/// </summary>
/// <param name="format">日期格式,例如:yyyy-MM-dd HH:mm:ss</param>
/// <return>日期对象</return>
String.prototype.toDate = function (format = 'yyyy-MM-dd'): Date {
    // if (typeof format != 'string')
    //     format = "yyyy-MM-dd";

    let regex = format.replace(/yyyy/, '([0-9]{4})').replace(/yy/, '([0-9]{2})')
        .replace(/y/, '([0-9]{1,2})').replace(/MM/, '([0-9]{2})')
        .replace(/dd/, '([0-9]{2})').replace(/M/, '([0-9]{1,2})')
        .replace(/d/, '([0-9]{1,2})').replace(/HH/, '([0-9]{2}|0)')
        .replace(/mm/, '([0-9]{2})').replace(/ss/, '([0-9]{2})')
        .replace(/H/, '([0-9]{1,2})').replace(/m/, '([0-9]{1,2})')
        .replace(/s/, '([0-9]{1,2})');

    let matchs = this.match(new RegExp('^' + regex + '(.*)'));

    if (!matchs || matchs.length <= 0) //return null;
        return null;

    let formatIndex = format.replace(/y+/, 'y').replace(/M+/, 'M').replace(/d+/, 'd')
        .replace(/H+/, 'H').replace(/m+/, 'm').replace(/s+/, 's')
        .replace(/[^a-z]+/ig, '');

    let date = { y: 0, M: 0, d: 0, H: 0, m: 0, s: 0 };
    for (let i = 0; i < formatIndex.length; i++) {
        let v = parseInt(matchs[i + 1], 10);
        if (isNaN(v))
            return null;
        date[formatIndex.substr(i, 1)] = v;
    }

    return new Date(date.y, date.M - 1, date.d, date.H, date.m, date.s);
}
String.prototype.encode = function (): string {
    if (this == "") return '';
    return encodeURIComponent(this);
}

String.prototype.decode = function (): string {
    if (this == "") return '';
    return decodeURIComponent(this);
}

/// <summary>
/// 移除字符空白字符
/// </summary>
String.prototype.trim = function () {
    if (this == "") return '';
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
/// <summary>
/// 移除两侧字符
/// </summary>
/// <param name="str">字符串</param>
/// <param name="ch">移除字符</param>
String.prototype.trimLeftRight = function (ch) {
    if (this == "") return '';
    return this.trimRight(ch).trimLeft(ch);
}

/// <summary>
/// 移除左侧字符
/// </summary>
/// <param name="str">字符串</param>
/// <param name="ch">移除字符</param>
/// <returns>移除后字符串</returns>
// String.prototype.trimLeft =  (str, ch)=> {
//     if (this == "") return '';
//     return this.replace(new RegExp('^' + ch + '*', 'g'), '');
// }

/// <summary>
/// 移除右侧侧字符
/// </summary>
/// <param name="str">字符串</param>
/// <param name="char">移除字符</param>
/// <returns>移除后字符串</returns>
// String.prototype.trimRight = (str, ch) => {
//     if (this == "") return '';
//     return str.replace(new RegExp(ch + '*$', 'g'), '');
// }

/// <summary>
/// 左侧字符填充
/// </summary>
/// <param name="ch">填充字符</param>
/// <param name="length">填充后字符串长度</param>
/// <returns>填充后字符串</returns>
String.prototype.padLeft = function (ch, length: number) {
    let str = this;
    for (let i = 0; i < length - this.length; i++)
        str = ch + str;
    return str;
}

/// <summary>
/// 右侧字符填充
/// </summary>
/// <param name="ch">填充字符</param>
/// <param name="length">填充后字符串长度</param>
/// <returns>填充后字符串</returns>
String.prototype.padRight = function (ch, length: number) {
    let str = this;
    for (let i = 0; i < length - str.length; i++)
        str = str + ch;
    return str;
}

String.prototype.isDigital = function () {
    let str = this;
    if (str == '') return false;
    return /^\d+(\.\d+)?$/.test(str);
}
String.prototype.isMobile = function () {
    var phone = this;
    var reg = /^(1)[\d]{10}$/;                    //正则3
    if (phone.match(reg) == null) {
        return false;
    }
    else {
        return true;
    }
}
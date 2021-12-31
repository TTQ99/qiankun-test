interface Date{
    copy(): Date;
    clone(): Date;
    compare(date: Date): Number;
    toString(format: String): string;
    customerString(format: String): string;
    addDays(day: Number): void;
    addWeeks(week: Number): void;
    addMonths(month: Number): void;
    addYears(year: Number): void;
}
/// <summary>
/// 日期拷贝
/// </summary>
/// <return>日期对象</return>
Date.prototype.copy = function (): Date {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}
Date.prototype.clone = function (): Date {
    let d = new Date(this.getTime());
    return d;
}
/*
 * 日期比较
 */
Date.prototype.compare = function (date): Number {
    return this.getTime() - date.getTime();
}

Date.prototype.toString = function (format = "yyyy-MM-dd"): string {
    // if (!format || typeof format != 'string')
    //     format = "yyyy-MM-dd";

    format = format.replace(/yyyy/, this.getFullYear())
      .replace(/yy/, this.getFullYear().toString().substring(2))
      .replace(/y/, this.getFullYear().toString().substring(2).trimLeft("0"))
      .replace(/MM/, (this.getMonth() + 1).toString().padLeft('0', 2))
      .replace(/dd/, this.getDate().toString().padLeft('0', 2))
      .replace(/M/, (this.getMonth() + 1))
      .replace(/d/, this.getDate().toString())
      .replace(/HH/, this.getHours().toString().padLeft('0', 2))
      .replace(/hh/, (this.getHours() > 12 ? (this.getHours() - 12) : this.getHours()).toString().padLeft('0', 2))
      .replace(/mm/, this.getMinutes().toString().padLeft('0', 2))
      .replace(/ss/, this.getSeconds().toString().padLeft('0', 2))
      .replace(/H/, this.getHours())
      .replace(/h/, (this.getHours() > 12 ? (this.getHours() - 12) : this.getHours()))
      .replace(/m/, this.getMinutes())
      .replace(/s/, this.getSeconds());
    return format;
}

Date.prototype.addDays = function (d: Number) {
    this.setDate(this.getDate() + d);
};

Date.prototype.addMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};

Date.prototype.addYears = function (y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
};


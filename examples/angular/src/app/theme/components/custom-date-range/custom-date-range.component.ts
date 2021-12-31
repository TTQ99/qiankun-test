import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-custom-date-range',
  templateUrl: './custom-date-range.component.html',
  styleUrls: ['./custom-date-range.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDateRangeComponent),
    multi: true
  }]
})
export class CustomDateRangeComponent implements OnInit {

  private pageName = 'custom-date-range';
  public startDate: Date|null;
  public endDate: Date|null;
  public _data = [];

  // 开始时间改变了：设置结束时间
  startDateChange(startValue){
    // 先判断结束时间是否在开始时间的31天之内；如果在不设置
    startValue = subDays(startValue,1);
    const endLimitValue = addDays(startValue,31);
    if(this.endDate>endLimitValue) {
      this.endDate = endLimitValue;
    }
    this.updateDateRangeValue();
  }
  // 限制结束时间的范围
  disabledEndDate = (endValue: Date): boolean => {
    let startValue = this.startDate;
    startValue = subDays(startValue,1);
    const limitValue = addDays(startValue,31);
    if (!endValue || !startValue) {
      return false;
    }
    // true是可以选择的，false是禁止的
    return !(endValue >= startValue && endValue <= limitValue);
  };
  // 结束日期选择后
  onEndChange(){
    this.updateDateRangeValue();
  }
  // 更新日期值
  updateDateRangeValue(){
    let arr = [];
    if (this.startDate && this.endDate) {
      arr = [this.startDate, this.endDate];
    }
    this.change(arr);
  }

  constructor() { }

  ngOnInit() {
  }

  onTouched: () => void = () => null;
  public change = (value: any) => {};
  writeValue(val): void {
    const _val = val || [];
    this.startDate = _val[0] || null;
    this.endDate = _val[1] || null;
  }
  registerOnChange(fn: any): void {
    this.change = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void { }

}

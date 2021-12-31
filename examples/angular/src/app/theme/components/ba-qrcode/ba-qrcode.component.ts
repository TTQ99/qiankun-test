import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

export interface QRCodeItem {
  text: string;
  data: string;
}

@Component({
  selector: 'app-ba-qrcode',
  templateUrl: './ba-qrcode.component.html',
  styleUrls: ['./ba-qrcode.component.scss']
})

export class BaQrcodeComponent implements OnInit, OnDestroy {

  constructor() { }

  public timer = null;
  public _data: QRCodeItem[];
  @Input()
  set data(val: QRCodeItem[]) {
    if (Array.isArray(val)) {
      this._data = val;
    } else {
      this._data = [val];
    }
  }
  get data() {
    return this._data;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(mql => {
        if (mql.matches) {
          this.beforePrint();
        } else {
          this.afterPrint();
        }
      });
    }
    window.onbeforeprint = this.beforePrint;
    window.onafterprint = this.afterPrint;
  }

  print() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    const newWin = window.open(''); // 新打开一个空窗口
    for (let i = 0; i < this.data.length; i++) {
      const imageToPrint = document.getElementById(`QRCode${i}`); // 将要被打印的图片
      newWin.document.write(imageToPrint.outerHTML); // 将图片添加进新的窗口
    }
    newWin.document.close(); // 在IE浏览器中使用必须添加这一句
    newWin.focus(); // 在IE浏览器中使用必须添加这一句
    this.timer = setTimeout(() => {
      newWin.print(); // 打印
      newWin.close(); // 关闭窗口
    }, 100);
  }

  handCancel() {
    this.cancel.emit();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  beforePrint() {
  };

  afterPrint() {
  };

}

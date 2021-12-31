import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, HostListener, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectTableComponent),
    multi: true
  }],
  animations: [
    trigger('selectTableAnimation', [
      state('hidden', style({
        opacity: 0,
        display: 'none'
      })),
      state('bottom', style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 0%'
      })),
      state('top', style({
        opacity: 1,
        transform: 'scaleY(1)',
        transformOrigin: '0% 100%'
      })),
      transition('hidden => bottom', [
        style({
          opacity: 0,
          transform: 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('bottom => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity: 0,
          transform: 'scaleY(0.8)',
          transformOrigin: '0% 0%'
        }))
      ]),
      transition('hidden => top', [
        style({
          opacity: 0,
          transform: 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }),
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)')
      ]),
      transition('top => hidden', [
        animate('100ms cubic-bezier(0.755, 0.05, 0.855, 0.06)', style({
          opacity: 0,
          transform: 'scaleY(0.8)',
          transformOrigin: '0% 100%'
        }))
      ])
    ])
  ]
})
export class SelectTableComponent implements ControlValueAccessor {

  public dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  public isOpen = false;
  public _loading = false;
  public _name = '';
  public _value: any = {};
  public _data: Array<any> = [];
  public frontData: any = { list: [], total: 0 };
  public _total = 0;
  public _width = 0;
  public _height = '260px';
  public scrollX = '';
  public scrollY = '';
  public searchValue = '';
  public pageIndex = 1;
  public pageSize = 10;
  public allChecked = false;
  public indeterminate = false;
  public displayData: Array<any> = [];
  public checkedList: Array<any> = [];
  public _isShowInput = true; // 是否展示input样式
  public _placeHolder = '';
  public timer = null;
  public _theadList: Array<any> = [];
  @Input() showField: string;

  @Input() isDisabled: boolean;
  @Input() multiple: boolean;
  @Input() isFrontPagination = false;
  @Input() onlyMark: string = 'id';
  @Output() changeTable: EventEmitter<any> = new EventEmitter();
  @Output() searchTable: EventEmitter<any> = new EventEmitter();
  @ViewChild(CdkConnectedOverlay) _cdkOverlay: CdkConnectedOverlay;
  @ViewChild('trigger') trigger: ElementRef;
  onTouched: () => void = () => null;

  @Input()
  set theadList(val) {
    this._theadList = val;
    this.updateScrollX();
  }
  get theadList() {
    return this._theadList;
  };
  @Input()
  set tbodyData(value: { list: [], total: number }) {
    this.timer && clearTimeout(this.timer);
    this._loading = false;
    if (value.list) {
      if (this.allChecked) {
        this.allChecked = false;
      }
      this._data = value.list;
      this.frontData.list = value.list;
      this.updateScrollY();
      // 复选框回选
      if (this.multiple) {
        if (this.checkedList.length > 0) {
          this._data.forEach(item => {
            this.checkedList.forEach(child => {
              if (item[this.onlyMark] === child[this.onlyMark]) {
                item.checked = true;
              }
            });
          });
        }
      }
      if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
        this.updateCdkConnectedOverlayPositions();
      }
    }
    if (value.total) {
      this._total = value.total / 1;
      this.frontData.total = value.list;
    }
    if (this.isFrontPagination && this.searchValue) {
      this.onSearch();
    }
  }

  @Input()
  set isShowInput(val) {
    this._isShowInput = val;
  }

  @Input()
  set width(value) {
    this._width = value;
    if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
      this._cdkOverlay.overlayRef.updateSize({
        width: this._width
      });
    }
  }
  get width() {
    return this._width;
  }
  @Input()
  set height(value) {
    this._height = value;
    // this.scrollH = parseFloat(value) - 130;
  }
  get height() {
    return this._height;
  }
  @Input()
  set placeHolder(value) {
    this._placeHolder = value ? value : '';
  }

  get placeHolder() {
    return '';
  }

  constructor(

    public _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) { }

  ngOnInit() {
  }

  public change = (value: any) => { };
  writeValue(val): void {
    if (val) {
      if (val.constructor === Object) {
        this._name = val[this.showField];
      } else if (Array.isArray(val)) {
        this.checkedList = val;
      } else {
        this._name = val;
      }
    } else {
      this._name = '';
    }
  }
  registerOnChange(fn: any): void {
    this.change = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    // if (disabled) {
    //   this.setOpenState(false);
    // }
    // this.cdr.markForCheck();
    //this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  // 更改显示位置
  _setTriggerWidth(): void {
    this._width = this._getTriggerRect().width;
    if (this._cdkOverlay && this._cdkOverlay.overlayRef) {
      this._cdkOverlay.overlayRef.updateSize({
        width: this._width
      });
    }
  }
  _getTriggerRect(): ClientRect {
    return this.trigger.nativeElement.getBoundingClientRect();
  }

  // 展开下拉列表
  triggleOpen() {
    if (this.isDisabled) { return; }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      if (this.width === 0) {
        this._setTriggerWidth();
      }
      this.updateCdkConnectedOverlayPositions();
      this._loading = true;
      this.pageIndex = 1;
      this.searchValue = '';
      this._data = [];
      this.changeTable.emit({
        page: this.pageIndex,
        size: this.pageSize,
        sort: '',
        value: this.searchValue
      });
      // this.timer = setTimeout(()=>{
      //   this._loading = false;
      //   this._data = [];
      //   this._total = 0;
      // }, 5000)
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }
  updateCdkConnectedOverlayPositions(): void {
    setTimeout(() => this._cdkOverlay.overlayRef.updatePosition(), 160);
  }

  // 给input框赋值
  showName(data) {
    if (!this._isShowInput) { return; }
    if (this.multiple) { return; }
    this._name = data[this.showField];
    this._value = data;
    this.change(this._value);
    this.isOpen = false;
  }

  // 清空
  resetInput(e) {
    e && e.stopPropagation();
    this._name = '';
    this._value = '';
    this.change(this._value);
  }

  // 删除元素
  deleteItem(event: Event, index) {
    this.checkedList.splice(index, 1);
    this.change(this.checkedList);
    event.stopPropagation();
  }

  // 切换分页
  changePageIndex(pageNum) {
    this.pageIndex = pageNum;
    if (this.isFrontPagination) { return; }
    this._data = [];
    this._loading = true;
    this.changeTable.emit({
      page: this.pageIndex,
      size: this.pageSize,
      sort: '',
      value: this.searchValue
    });
  }
  // 搜索
  onSearch() {
    if (this.isFrontPagination) {
      // 前端分页
      const keys = this.theadList.map(item => item.key);
      const arr = [];
      this.frontData.list.forEach(item => {
        for (let i = 0; i < keys.length; i++) {
          if (item[keys[i]] && item[keys[i]].includes(this.searchValue)) {
            arr.push(item);
            return;
          }
        }
      })
      this.pageIndex = 1;
      this._data = arr;
      this._total = arr.length;
    } else {
      this._data = [];
      this._loading = true;
      this.searchTable.emit({
        page: 1,
        size: this.pageSize,
        sort: '',
        value: this.searchValue
      });
    }
  }

  // 关闭
  closeTable() {
    if (!this.isOpen) {
      return;
    }
    this.onTouched();
    this.isOpen = false;
  }

  refreshStatus(e, data, type = 'single'): void {
    const allChecked = this._data.every(value => value.checked === true);
    const allUnChecked = this._data.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    // 记录选中的数据
    if (type === 'all') {
      // 全选、全不选
      this._data.forEach(item => {
        if (item.checked) {
          const obj = this.checkedList.find(child => child[this.onlyMark] === item[this.onlyMark]);
          if (!obj) {
            this.checkedList.push(item);
          }
        } else {
          const index = this.checkedList.findIndex(child => child[this.onlyMark] === item[this.onlyMark]);
          if (index !== undefined) {
            this.checkedList.splice(index, 1);
          }
        }
      });
    } else {
      // 单独选中某一个
      if (e) {
        const obj = this.checkedList.find(child => child[this.onlyMark] === data[this.onlyMark]);
        if (!obj) {
          this.checkedList.push(data);
        }
      } else {
        const index = this.checkedList.findIndex(child => child[this.onlyMark] === data[this.onlyMark]);
        if (index !== undefined) {
          this.checkedList.splice(index, 1);
        }
      }
    }
    this.change(this.checkedList);
  }
  // 全选
  checkAll(value: boolean): void {
    this._data.forEach(data => data.checked = value);
    this.refreshStatus(false, null, 'all');
  }
  @HostListener('document:keyup', ['$event']) keyup(event) {
    if (event.keyCode == '13') {
      this.onSearch();
    }
  }

  // 更新表格横向宽度
  updateScrollX() {
    // const num = this.theadList.reduce((accumulator, item) => {
    //   item.width = item.width || 100;
    //   return accumulator+ Number(item.width);
    // })
    // if(this._width>0 && num<(this._width-20)){

    // }
  }

  updateScrollY() {
    if (this._data.length >= 5) {
      this.scrollY = '170px';
    } else {
      this.scrollY = '';
    }
  }
}

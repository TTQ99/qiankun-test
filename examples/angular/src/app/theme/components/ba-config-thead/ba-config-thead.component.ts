import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { TransferItem, NzTransferComponent } from 'ng-zorro-antd/transfer';

import { BaseService } from '../../../pages/base-service';
import { CommonPageWidth } from 'src/app/pages/base-page';

@Component({
  selector: 'ba-config-thead',
  templateUrl: './ba-config-thead.component.html',
  styleUrls: ['./ba-config-thead.component.scss']
})
export class BaConfigTheadComponent implements OnInit {

  constructor(

    protected baseService: BaseService,
  ) { }

  public existCheckBox = false; // 是否存在复选框，默认不存在
  public checkboxObject = null; // 保存复选框对象
  // public _list: TransferItem[] = [];
  public selectItem: any;
  public disabled = false;
  // public reqList=[]

  @Input()
  set data(val: Array<any>) {
    if (val) {
      const arr = ['checkbox', 'order', 'actions'];
      this.checkboxObject = val.filter(item => !item.title);
    }
  }
  get data() {
    return [];
  };
  @Input() isVisible;
  @Output() sure = new EventEmitter();
  @Output() cancel = new EventEmitter();
  // @ViewChild('nzTransfer') nzTransfer: NzTransferComponent;

  ngOnInit() {
  }

  select(ret: {}): void {
    this.selectItem = ret;
  }

  changes(ret: {}): void {
    if (ret['to'] == 'left') {
      ret['list'].forEach(item => {
        item.show = false;
        item.fixed = false;
      });
    } else {
      ret['list'].forEach(item => {
        item.show = true;
      });
    }
    // this.reqList=[ret]
    this.sortData();
  }

  sortData() {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    // 如果存在复选框，将其放回table
    let result = [];
    if (this.existCheckBox) {
      result = [];
    } else {
      result = [];
    }
    this.sure.emit(result);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.cancel.emit(false);
  }

  theadSortDrag(event: CdkDragDrop<string[]>, arr): void {
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.sortData();
  }

}

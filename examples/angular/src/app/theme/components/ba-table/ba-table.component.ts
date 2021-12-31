import { Component, OnInit, ContentChild, TemplateRef, Output, EventEmitter, AfterContentInit, AfterContentChecked, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

import { NzTableComponent } from 'ng-zorro-antd/table';
import { CommonPageWidth } from 'src/app/pages/base-page';
import { GlobalState } from 'src/app/global.state';
import { keys } from 'src/app/common/key';

@Component({
  selector: 'app-ba-table',
  templateUrl: './ba-table.component.html',
  styleUrls: ['./ba-table.component.scss']
})
export class BaTableComponent implements OnInit, AfterViewInit, AfterContentInit, AfterContentChecked {

  constructor(

    public state: GlobalState,
  ) { }

  public pageName = 'ba-table';
  public pageIndex: number;
  public pageSize: number;
  public totalPage: number;
  public total: number;
  @ContentChild(NzTableComponent) childCmp: NzTableComponent;
  @ViewChild('totalTemplate') totalTemplate: TemplateRef<any>;
  @ViewChild('TableMainContent') private tableParentNode: ElementRef;
  @Output() settingThead: EventEmitter<any> = new EventEmitter();
  @Input() isConfigThead: boolean = false;

  ngOnInit() {
    this.state.subscribe(keys.menuCollapsed, this.pageName, isCollapse => {
      this.updatePageContentClientWidth();
    });
  }

  ngAfterViewInit() {
    // 保存table父级的宽度，用于表格th拖拽，计算宽度和，赋值nzScroll的X用
    this.updatePageContentClientWidth();
  }

  // 更新宽度
  updatePageContentClientWidth() {
    setTimeout(() => {
      CommonPageWidth.pageContentClientWidth = this.tableParentNode.nativeElement.clientWidth;
    }, 160);
  }

  ngAfterContentInit() { }

  ngAfterContentChecked() {
    const table = this.childCmp;
    table.nzShowTotal = this.totalTemplate;
    table.nzPageSizeOptions = [10, 20, 50, 100, 200];
    this.pageIndex = table.nzPageIndex;
    this.pageSize = table.nzPageSize;
    this.total = table.nzTotal;
    this.totalPage = Math.ceil(this.total / this.pageSize);
  }

  setting() {
    this.settingThead.emit(true);
  }

}

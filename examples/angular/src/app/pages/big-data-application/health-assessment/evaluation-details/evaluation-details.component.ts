import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from 'src/app/pages/base-page';
import { GlobalState } from 'src/app/global.state';
import { HealthAssessmentService } from '../health-assessment.service';
import { NzMessageService } from 'ng-zorro-antd';
import { format } from "date-fns";
import * as echarts from 'echarts';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

var colors = ["rgb(240, 65, 52) ", "rgb(245, 198, 0)", "#1a8cff", "#00a854"];

function getIdx(value) {
  var p = value / 100
  var idx;
  if (p <= 0.6) {
    idx = 0
  } else if (p > 0.6 && p <= 0.75) {
    idx = 1;
  } else if (p > 0.75 && p <= 0.85) {
    idx = 2;
  } else if (p > 0.85 && p <= 1) {
    idx = 3;
  }
  return idx;
}
function getColor(value) {
  return colors[getIdx(value)];
}


@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrls: ['./evaluation-details.component.scss']
})


export class EvaluationDetailsComponent extends BasePage implements OnInit {
  @Output() cancelEvent = new EventEmitter<any>();
  @ViewChild('dashBoardChart') dashChartDiv: ElementRef
  @ViewChild('barChart') barChartDiv: ElementRef
  @ViewChild('gaugeChart') gaugeChartDiv: ElementRef

  public dashBoard: any;
  public lineAndBarOption: any;
  public dateRange: any;
  public data: any;
  public addParamsData: any;
  public radar: any;
  public rowspanNumber: number;
  public uuid: string;
  public equipmentUuid: string;
  public evaluationTimeEnd: number;
  public evaluationTime: number;
  public evaluationTimeStart: number;
  public evaluationUuid: string;
  public isdefault: string;
  public page: string;
  public size: string;
  public ownedLineBody: string;//所属线体
  public deviceName: string;//设备名称
  public deviceID: string;//设备编号
  public equipmentType: string;//设备类型
  public deviceModel: string;//设备型号
  public equipmentBrand: string;//设备品牌
  public indicator: any;//雷达图indicator
  public indicatorData: any;//雷达图数据
  public deviceScore: number;
  public EquipmentEvaluationInfoParam: any;
  public barDate: any;//柱状图日期数据
  public barEvaluation: any;//柱状图评分数据
  public barHistoryEvaluation: any;//柱状图历史数据
  public RepairWorkOrder: any;//维修工单数据
  public listOfData: any = [];//评估明细
  public barEvaluationTime: number;//分析时间
  public isNewParameter: boolean;//显示规则
  public parameterData: any;//显示规则的数据
  public theadList: any = [];//评分详细的表头数据
  public min: number;//第一个关键参数的位置
  public loadingDetails: boolean = false;//详细评分是否加载中
  public startTime: number;//时间选择器起始时间
  public noDataShow: boolean = false
  public isAddParams: boolean = false
  constructor(

    public router: Router,
    public activedRoute: ActivatedRoute,
    public state: GlobalState,
    public activateInfo: ActivatedRoute,
    private service: HealthAssessmentService,
    private message: NzMessageService,
  ) {
    super(router, activedRoute, state)
    activateInfo.queryParams.subscribe(queryParams => {
      const data = JSON.parse(queryParams.data)
      this.data = data
      this.uuid = data.uuid
      this.equipmentUuid = data.equipmentUuid
      this.evaluationTimeEnd = data.evaluationTime
      this.barEvaluationTime = data.evaluationTime
      this.evaluationTime = data.evaluationTime
      this.evaluationUuid = data.id
      this.equipmentBrand = data.brand
      this.ownedLineBody = data.lineName
      this.deviceName = data.equipmentName
      this.deviceID = data.assetId
      this.equipmentType = data.equipmentTypeName
      this.deviceModel = data.equipmentModel
      this.deviceScore = data.deviceScore ? (data.deviceScore).toFixed(2) : 0
      this.startTime = 1590033600000 //设置起始时间
      this.indicator = data.submoduleEvaluationInfo.map((item) => {
        return {
          name: item.modularName,
          value: (item.moduleScore).toFixed(2)
        }
      })
      this.EquipmentEvaluationInfoParam = {
        equipmentUuid: this.equipmentUuid,
        evaluationTimeEnd: this.evaluationTimeEnd,
        isdefault: true,
        page: 1,
        size: 100,
      }
    })
  }

  public breadcrumbList = [
    { name: 'bigDataApplication.title' },
    { name: 'bigDataApplication.healthAssessment.title' },
    { name: '评估详情' }
  ];

  ngOnInit(): void {
  }

  AfterViewChecked() {

  }




}

import { Component, } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from 'src/app/pages/base-page';
import { GlobalState } from 'src/app/global.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HealthAssessmentService } from '../../health-assessment.service'
import { NzCascaderOption, NzMessageService } from 'ng-zorro-antd';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss']
})
export class AssessmentListComponent extends BasePage {
  nzOptions: any = [];
  public validateForm!: FormGroup;
  constructor(

    public router: Router,
    public activedRoute: ActivatedRoute,
    public state: GlobalState,
    private service: HealthAssessmentService,
    private fb: FormBuilder,
    private message: NzMessageService,
  ) {
    super(router, activedRoute, state)
  }

  public equipmentCode: any;
  public dateRange: any;
  public values: any;
  public evaluationTimeStart: number; //评估时间 开始时间 时间戳 毫秒值
  public evaluationTimeEnd: number; //评估时间 结束时间 时间戳 毫秒值
  public lineCode: string; //	生产线体编码
  public pageTotal: number;
  public pageSize: number = 4;
  public pageIndex: number = 1;
  public devCodeList: any;
  public ParameterData: any;
  public rootKey: string;
  public panels: any;
  public isdefault: boolean = true;
  public empty: boolean = false;
  public loadingAssessment: boolean = false;
  public loadDataList: any
  public deviceData: any
  public startTime: number;//时间选择器起始时间
  list = []


  ngOnInit(): void {
    this.startTime = 1590033600000 //设置起始时间
    this.validateForm = this.fb.group({
      test1: [[]],
      equipmentCode: [[]],
      date: [[]],
    });
    this.ParameterData = {
      page: this.pageIndex,
      size: this.pageSize,
      isdefault: this.isdefault,
    }
    this.customCopy()
  }
  customCopy() {
    this.service.customCopy().then((result) => {
      console.log('%c 🍏 result: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', result);
      this.list = result
    }).catch((err) => {

    });
  }

  //评估详情
  EvaluationDetails(data) {
    this.router.navigate(['/scim-bigdata-app/bigDataApplication/HealthAssessment/EvaluationDetails'], {
      relativeTo: this.activedRoute, queryParams: {
        data: JSON.stringify(data)
      }
    })


  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.startTime) < 0;
  }
}

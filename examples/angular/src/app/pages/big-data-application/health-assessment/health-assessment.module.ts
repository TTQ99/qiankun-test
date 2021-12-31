import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthAssessmentComponent } from './health-assessment.component';
import { NgxEchartsModule } from "ngx-echarts";
import { EvaluationDetailsComponent } from './evaluation-details/evaluation-details.component'
import { routing } from './health-assessment.routing'
import { NgaModule } from 'src/app/theme/nga.module';
// import { AppTranslationModule } from 'src/app/app.translation.module';
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { AssessmentModule } from './assessment/assessment.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    // AppTranslationModule,
    NgaModule,
    NgZorroAntdModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzCollapseModule,
    NzTableModule,
    NzPaginationModule,
    NzTreeModule,
    NzResizableModule,
    NgxEchartsModule,
    AssessmentModule
  ],
  declarations: [
    HealthAssessmentComponent,
    EvaluationDetailsComponent,
  ]
})
export class HealthAssessmentModule { }

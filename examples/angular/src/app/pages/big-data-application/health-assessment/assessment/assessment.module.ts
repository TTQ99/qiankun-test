import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentComponent } from './assessment.component';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
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
import { routing } from './assessment.routing'

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
  ],
  declarations: [
    AssessmentComponent,
    AssessmentListComponent,
  ]
})
export class AssessmentModule { }

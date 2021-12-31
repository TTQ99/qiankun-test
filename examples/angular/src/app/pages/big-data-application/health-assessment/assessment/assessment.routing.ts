import { Routes, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment.component';
import { CanActivateService } from '../../../canActivate.service';
import { AssessmentListComponent } from './assessment-list/assessment-list.component'



const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    children: [
      { path: '', redirectTo: 'AssessmentList', pathMatch: 'full', data: { reuse: true } },
      { path: 'AssessmentList', component: AssessmentListComponent, canActivate: [CanActivateService], data: { reuse: true } },
    ], data: { reuse: true }
  },
];

export const routing = RouterModule.forChild(routes);

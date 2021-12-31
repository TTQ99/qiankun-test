import { Routes, RouterModule } from '@angular/router';
import { HealthAssessmentComponent } from './health-assessment.component';
import { CanActivateService } from '../../canActivate.service';
import { EvaluationDetailsComponent } from './evaluation-details/evaluation-details.component'



const routes: Routes = [
  {
    path: '',
    component: HealthAssessmentComponent,
    children: [
      { path: '', redirectTo: 'Assessment', pathMatch: 'full' },
      { path: 'Assessment', loadChildren: () => import('./assessment/assessment.module').then(m => m.AssessmentModule) },
      { path: 'EvaluationDetails', component: EvaluationDetailsComponent, canActivate: [CanActivateService] }
    ]
  },
];

export const routing = RouterModule.forChild(routes);

import { Routes, RouterModule } from '@angular/router';
import { BigDataApplicationComponent } from './big-data-application.component';
import { CanActivateService } from '../canActivate.service';


const routes: Routes = [
  {
    path: '',
    component: BigDataApplicationComponent,
    children: [
      { path: '', redirectTo: 'HealthAssessment', pathMatch: 'full' },
      { path: 'HealthAssessment', loadChildren: () => import('./health-assessment/health-assessment.module').then(m => m.HealthAssessmentModule) },
    ]
  },
];

export const routing = RouterModule.forChild(routes);

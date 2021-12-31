import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
export const routes: Routes = [
  {
    path: 'scim-bigdata-app',
    component: Pages,
    children: [
      //  大数据应用
      { path: '', redirectTo: 'bigDataApplication', pathMatch: 'full' },
      { path: 'bigDataApplication', loadChildren: () => import('./big-data-application/big-data-application.module').then(m => m.BigDataApplicationModule) },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: "", redirectTo: 'scim-bigdata-app', pathMatch: 'full' },
  { path: "scim-bigdata-app", loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: "enabled" });

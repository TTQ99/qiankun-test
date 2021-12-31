import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigDataApplicationComponent } from './big-data-application.component';
import { routing } from './big-data-application.routing';


@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [BigDataApplicationComponent]
})
export class BigDataApplicationModule { }

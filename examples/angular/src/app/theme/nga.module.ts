import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { AppTranslationModule } from '../app.translation.module';
import { QRCodeModule } from 'angularx-qrcode';

import {
  BaPageTop,
  PageMenuComponent,
  BaConfigTheadComponent,
  LanguageTemplateComponent,
  BaBreadcrumbComponent,
  BaQrcodeComponent,
  BaTableComponent,
  BaUploadComponent,
  SelectTableComponent,
  BaInputNumberComponent,
  CustomDateRangeComponent
} from './components';

import {
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';
import { FileUploadModule } from 'ng2-file-upload';
import { DragAroundDirective } from './drag-around/drag-around.directive';


const NGA_COMPONENTS = [
  BaPageTop,
  PageMenuComponent,
  BaConfigTheadComponent,
  LanguageTemplateComponent,
  BaBreadcrumbComponent,
  BaQrcodeComponent,
  BaTableComponent,
  BaUploadComponent,
  SelectTableComponent,
  BaInputNumberComponent,
  CustomDateRangeComponent
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS,
    DragAroundDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    // AppTranslationModule,
    NgZorroAntdModule,
    NzResizableModule,
    DragDropModule,
    QRCodeModule,
    FileUploadModule
  ],
  exports: [
    ...NGA_COMPONENTS,
    DragAroundDirective
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    } as ModuleWithProviders;
  }
}

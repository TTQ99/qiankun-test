import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单模块，在应用中使用表单时引入  当要构建响应式表单时
import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
// import { AppTranslationModule } from '../app.translation.module';
import { Pages } from './pages.component';
import { CanActivateService } from './canActivate.service';
import { NgZorroAntdModule, NZ_CONFIG } from 'ng-zorro-antd';
import { BaseService } from './base-service';
import { DragulaService } from 'ng2-dragula';
import { DragulaModule } from 'ng2-dragula';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { from } from 'rxjs';

@NgModule({
  imports: [ //导入表， 声明了要让应用运转所依赖的一些模块。
    CommonModule,//NgIf和NgFor 等这些指令放在CommonModule里面，使用的时候需要导入
    // AppTranslationModule,//语言转换
    routing,//路由信息
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DragulaModule,
    DragDropModule,
    NzResizableModule,
    NzCheckboxModule,
    NzTransferModule,
    NzModalModule,
    NgaModule,//双向绑定
  ],
  declarations: [ //声明模块有什么东西， 只能声明组件、 指令和管道。
    Pages,
  ],
  providers: [ //声明模块中提供了哪些服务， 只能声明服务。
    {
      provide: NZ_CONFIG,
      useValue: { nzMaxStack: 1, nzDuration: 4000 }
    },
    CanActivateService,
    BaseService,
    DragulaService
  ]
})
export class PagesModule {
}

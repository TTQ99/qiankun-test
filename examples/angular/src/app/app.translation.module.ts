import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Language } from './common/language';
import { zh_CN, en_US, NzI18nService } from 'ng-zorro-antd/i18n';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '', '');
}
const translationOptions = {
  loader: {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [HttpClient]
  }
};
@NgModule({
  imports: [HttpClientModule, TranslateModule.forRoot(translationOptions)],
  exports: [TranslateModule],
})
export class AppTranslationModule {
  timer = null;
  constructor(private nzI18nService: NzI18nService) {
  }


  transiton() {
    if (this.timer) { clearTimeout(this.timer); }
  }
}

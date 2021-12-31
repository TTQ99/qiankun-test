import { Component, OnInit, TemplateRef, ContentChild } from '@angular/core';
import { BasePage } from '../../../pages/base-page';

import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from '../../../global.state';

@Component({
  selector: 'app-language-template',
  templateUrl: './language-template.component.html',
  styleUrls: ['./language-template.component.scss']
})
export class LanguageTemplateComponent extends BasePage {

  constructor(
    router: Router,
    activedRoute: ActivatedRoute,
    state: GlobalState
  ) {
    super(router, activedRoute, state);
  }

  pageName = "language-template";
  @ContentChild(TemplateRef) tplLocale: TemplateRef<any>;

  onInit() {
  }

}

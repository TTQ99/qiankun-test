import { Component, OnInit, Input } from '@angular/core';
import { Language } from '../../../common/language';
import { keys } from '../../../common/key';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-breadcrumb',
  templateUrl: './ba-breadcrumb.component.html',
  styleUrls: ['./ba-breadcrumb.component.scss']
})
export class BaBreadcrumbComponent implements OnInit {

  public pageName = 'ba-breadcrumb';
  public _list: Array<any>;
  @Input()
  set list(value) {
    this._list = value;
  }
  get list() {
    return this._list;
  }

  constructor(
    private _state: GlobalState,
  ) { }

  ngOnInit() {
    // this._state.subscribe(keys.languageChanged, this.pageName, (lang, page) => {
    //   Language.luangage = lang;
    //   this.translate.use(Language.getLanguage());
    // });
  }

}

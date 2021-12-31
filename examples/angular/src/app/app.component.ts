import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import 'src/app/widget/script/date';
import 'src/app/widget/script/string';
import { BaImageLoaderService } from './theme/services/baImageLoader';
import { BaThemePreloader } from './theme/services/baThemePreloader';
import { BaThemeSpinner } from './theme/services/baThemeSpinner';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'great-wall';
  constructor(
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner
  ) { }
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }
}

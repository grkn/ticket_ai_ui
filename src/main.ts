/*!

=========================================================
* paper dashboard angular - v2.1.0
=========================================================

* product page: https://www.creative-tim.com/product/paper-dashboard-angular
* copyright 2019 creative tim (https://www.creative-tim.com)
* licensed under mit (https://github.com/creativetimofficial/paper-dashboard-angular/blob/master/license.md)

* coded by creative tim

=========================================================

* the above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IntentComponent} from '../../pages/intent/intent.component';
import {AnswersComponent} from '../../pages/answers/answers.component';
import {WebchatComponent} from '../../pages/maps/webchat.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselComponent} from '../../pages/answers/answer_types/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IntentComponent,
    AnswersComponent,
    WebchatComponent,
    NotificationsComponent,
    CarouselComponent
  ]
})

export class AdminLayoutModule {
}

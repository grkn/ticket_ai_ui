import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TicketComponent} from '../../pages/table/ticket.component';
import {ConfigComponent} from '../../pages/config/config.component';
import {IntentComponent} from '../../pages/intent/intent.component';
import {AnswersComponent} from '../../pages/answers/answers.component';
import {WebchatComponent} from '../../pages/maps/webchat.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/upgrade/upgrade.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselComponent} from '../../pages/answers/answer_types/carousel/carousel.component';
import {MessageComponent} from '../../pages/answers/answer_types/message/message.component';
import {QuickReplyComponent} from '../../pages/answers/answer_types/quick_reply/quickReply.component';
import {ListTemplateComponent} from '../../pages/answers/answer_types/list_template/listTemplate.component';
import {GenericButtonsComponent} from '../../pages/answers/answer_types/generic_buttons/genericButtons.component';

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
    TicketComponent,
    UpgradeComponent,
    ConfigComponent,
    IntentComponent,
    AnswersComponent,
    WebchatComponent,
    CarouselComponent,
    MessageComponent,
    QuickReplyComponent,
    ListTemplateComponent,
    GenericButtonsComponent
  ]
})

export class AdminLayoutModule {
}

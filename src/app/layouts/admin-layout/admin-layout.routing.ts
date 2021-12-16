import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { ConfigComponent } from '../../pages/config/config.component';
import { IntentComponent } from '../../pages/intent/intent.component';
import { WebchatComponent } from '../../pages/maps/webchat.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {AnswersComponent} from '../../pages/answers/answers.component';
import {CarouselComponent} from '../../pages/answers/answer_types/carousel/carousel.component';
import {MessageComponent} from '../../pages/answers/answer_types/message/message.component';
import {QuickReplyComponent} from '../../pages/answers/answer_types/quick_reply/quickReply.component';
import {ListTemplateComponent} from '../../pages/answers/answer_types/list_template/listTemplate.component';
import {GenericButtonsComponent} from '../../pages/answers/answer_types/generic_buttons/genericButtons.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'config',         component: ConfigComponent },
    { path: 'intent',         component: IntentComponent },
    { path: 'answers',        component: AnswersComponent },
    { path: 'chat',           component: WebchatComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'carousel',       component: CarouselComponent },
    { path: 'message',        component: MessageComponent },
    { path: 'quickReply',     component: QuickReplyComponent },
    { path: 'listTemplate',   component: ListTemplateComponent },
    { path: 'genericButtons', component: GenericButtonsComponent }
];

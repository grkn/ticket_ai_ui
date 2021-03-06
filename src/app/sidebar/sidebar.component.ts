import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/intent',        title: 'Intents',           icon:'nc-diamond',    class: '' },
    { path: '/answers',        title: 'Answers',          icon:'nc-diamond',    class: '' },
    { path: '/chat',          title: 'Ticket Chat',       icon:'nc-pin-3',      class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/ticket',         title: 'Tickets',        icon:'nc-tile-56',    class: '' },
    { path: '/config',        title: 'Configuration',     icon:'nc-settings-gear-65', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}

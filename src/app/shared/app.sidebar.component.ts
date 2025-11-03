import { Component, ElementRef } from '@angular/core';
import { LayoutService } from "../core/services/app.layout.service";
import { AppMenuComponent } from './app.menu.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    imports: [AppMenuComponent],
    standalone: true
})
export class AppSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}


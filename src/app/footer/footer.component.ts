import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { LegalComponent } from './legal/legal.component';
import { GrantNoticeComponent } from './grant-notice/grant-notice.component';

@Component({
    selector: 'app-footer',
    imports: [GrantNoticeComponent, MenuComponent, LegalComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {}

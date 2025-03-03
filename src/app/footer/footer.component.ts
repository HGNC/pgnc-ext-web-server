import { Component } from '@angular/core';

import { GrantNoticeComponent } from './grant-notice/grant-notice.component';
import { LegalComponent } from './legal/legal.component';
import { MenuComponent } from './menu/menu.component';

@Component({
    selector: 'app-footer',
    imports: [GrantNoticeComponent, MenuComponent, LegalComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {}

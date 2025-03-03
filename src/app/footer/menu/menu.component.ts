import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { CpRightComponent } from './cpright/cpright.component';
import { SocialMediaComponent } from './social-media/social-media.component';

@Component({
    selector: 'app-footer-menu',
    imports: [CpRightComponent, SocialMediaComponent, FontAwesomeModule, RouterLink],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
})
export class MenuComponent {
    faHome = faHome;
}

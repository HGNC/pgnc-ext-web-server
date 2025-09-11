import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from '../../nav/nav.component';

@Component({
    selector: 'app-home-header',
    imports: [FontAwesomeModule, NgbModule, NavComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HomeHeaderComponent {
    faBars = faBars;
    faEnvelope = faEnvelope;
    isMenuCollapsed = true;
}

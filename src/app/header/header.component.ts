import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from '../nav/nav.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
    selector: 'app-header',
    imports: [FontAwesomeModule, NavComponent, SearchBarComponent, NgbModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    faBars = faBars;
    isMenuCollapsed = true;
}

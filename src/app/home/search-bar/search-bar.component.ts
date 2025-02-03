import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home-search-bar',
    imports: [FontAwesomeModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
})
export class HomeSearchBarComponent {
    faSearch = faSearch;
    faQuestionCircle = faQuestionCircle;
}

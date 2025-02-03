import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-search-bar',
    imports: [FontAwesomeModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
    faSearch = faSearch;
    faQuestionCircle = faQuestionCircle;
}

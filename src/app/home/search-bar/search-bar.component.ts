import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home-search-bar',
    imports: [FontAwesomeModule, FormsModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.css',
})
export class HomeSearchBarComponent {
    faSearch = faSearch;
    faQuestionCircle = faQuestionCircle;

    query: string | undefined;

    constructor(private router: Router) {}

    search() {
        if (this.query) {
            this.router.navigate(['/search'], {
                queryParams: { q: this.query },
            });
        }
    }
}

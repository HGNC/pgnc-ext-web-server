import { Component } from '@angular/core';
import { HomeHeaderComponent } from './header/header.component';
import { HomeSearchBarComponent } from './search-bar/search-bar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HomeHeaderComponent, HomeSearchBarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}

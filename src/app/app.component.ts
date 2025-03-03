import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    currentRoute = '';
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.currentRoute = this.router.url;
        });
    }
}

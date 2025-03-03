import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-browser',
    imports: [FontAwesomeModule],
    templateUrl: './browser.component.html',
    styleUrl: './browser.component.css',
})
export class BrowserHelpComponent {
    faCircleCheck = faCircleCheck;
}

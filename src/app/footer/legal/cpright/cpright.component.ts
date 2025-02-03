import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-cpright',
    imports: [FontAwesomeModule],
    templateUrl: './cpright.component.html',
    styleUrl: './cpright.component.css',
})
export class CpRightComponent {
    faCopyright = faCopyright;
}

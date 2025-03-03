import { Component } from '@angular/core';

import { AssociatesComponent } from './associates/associates.component';
import { LicenceComponent } from './licence/licence.component';

@Component({
    selector: 'app-legal',
    imports: [AssociatesComponent, LicenceComponent],
    templateUrl: './legal.component.html',
    styleUrl: './legal.component.css',
})
export class LegalComponent {}

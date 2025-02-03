import { Component } from '@angular/core';
import { CpRightComponent } from './cpright/cpright.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { AssociatesComponent } from './associates/associates.component';
import { LicenceComponent } from './licence/licence.component';

@Component({
    selector: 'app-legal',
    imports: [CpRightComponent, SocialMediaComponent, AssociatesComponent, LicenceComponent],
    templateUrl: './legal.component.html',
    styleUrl: './legal.component.css',
})
export class LegalComponent {}

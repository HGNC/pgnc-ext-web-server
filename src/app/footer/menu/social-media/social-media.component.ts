import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBluesky, faGithub, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-social-media',
    imports: [FontAwesomeModule],
    templateUrl: './social-media.component.html',
    styleUrl: './social-media.component.css',
})
export class SocialMediaComponent {
    faXTwitter = faXTwitter;
    faGithub = faGithub;
    faYoutube = faYoutube;
    faBlog = faBlog;
    faComment = faComment;
    faBluesky = faBluesky;
}

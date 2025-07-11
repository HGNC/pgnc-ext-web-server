import { Component, OnInit } from '@angular/core';

import { FragmentJumpService } from '../../common/services/fragment-jump.service';

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchHelpComponent implements OnInit {
    constructor(private fragJumpService: FragmentJumpService) { }

    ngOnInit() {
        try {
            this.fragJumpService.subscribeToFragmentChanges().subscribe((frag: string | null) => {
                if (frag) this.fragJumpService.jumpToSection(frag);
            });
        } catch (error) {
            // Gracefully handle fragment service errors
            console.warn('Fragment service error:', error);
        }
    }
}

import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-search-results',
    imports: [KeyValuePipe],
    templateUrl: './results.component.html',
    styleUrl: './results.component.css',
})
export class ResultsComponent {
    @Input({ required: true }) results!: any[];
}

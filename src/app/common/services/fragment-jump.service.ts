import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class FragmentJumpService {
    constructor(private activatedRoute: ActivatedRoute) {}

    public jumpToSection(section: string | null) {
        if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }

    public subscribeToFragmentChanges() {
        return this.activatedRoute.fragment;
    }
}

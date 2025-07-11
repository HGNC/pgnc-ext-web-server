import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GeneSymbolReportComponent } from './data/gene-symbol-report/gene-symbol-report.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { BrowserHelpComponent } from './help/browser/browser.component';
import { FaqComponent } from './help/faq/faq.component';
import { GeneSymbolReportHelpComponent } from './help/gene-symbol-report/gene-symbol-report.component';
import { HelpComponent } from './help/help.component';
import { SearchHelpComponent } from './help/search/search.component';
import { UsefulLinksComponent } from './help/useful-links/useful-links.component';
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component';
import { PublicationsComponent } from './publications/publications.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: 'contact',
        component: ContactComponent,
    },
    {
        path: 'data/gene-symbol-report/:type/:id',
        component: GeneSymbolReportComponent,
    },
    {
        path: 'help',
        component: HelpComponent,
    },
    {
        path: 'help/faq',
        component: FaqComponent,
    },
    {
        path: 'help/browser',
        component: BrowserHelpComponent,
    },
    {
        path: 'help/search',
        component: SearchHelpComponent,
    },
    {
        path: 'help/gene-symbol-report',
        component: GeneSymbolReportHelpComponent,
    },
    {
        path: 'help/useful-links',
        component: UsefulLinksComponent,
    },
    {
        path: 'license',
        component: LicenseComponent,
    },
    {
        path: 'publications',
        component: PublicationsComponent
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

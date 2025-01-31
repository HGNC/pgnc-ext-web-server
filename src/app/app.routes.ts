import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GeneSymbolReportComponent } from './data/gene-symbol-report/gene-symbol-report.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'data/gene-symbol-report/:type/:id',
        component: GeneSymbolReportComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: '',
        component: HomeComponent
    }
];

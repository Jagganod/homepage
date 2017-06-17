import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotesComponent} from './notes/notes.component';
import {CatsComponent} from 'app/cats/cats.component';
import {AppMusik} from './musik/app.musik';
import {HomeImpressumComponent} from './impressum/impressum.component';
import {PageNotFoundComponent} from './system/page-not-found.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'notes',
        component: NotesComponent,
        data: {title: 'Notizen'}
    },
    {
        path: 'cats',
        component: CatsComponent,
        data: {title: 'Katzen'}
    },
    {
        path: 'musik',
        component: AppMusik,
        data: {title: 'Musik'}
    },
    {
        path: 'impressum',
        component: HomeImpressumComponent,
        data: {title: 'Impressum'}
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    /*    providers: [
     {provide: LocationStrategy, useClass: HashLocationStrategy}
     ],
     */
    exports: [RouterModule]
})
export class AppRoutingModule {
}

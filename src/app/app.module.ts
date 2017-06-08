import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import {PageNotFoundComponent} from './system/page-not-found.component';
import {HomeComponent} from './home/home.component';

import {NotesModule} from './notes/notes.module';
import {NotesComponent} from './notes/notes.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CatsComponent} from './cats/cats.component';
import {HomeImpressumComponent} from './impressum/impressum.component';
import {AppMusik} from './musik/app.musik';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CatsComponent,
        HomeImpressumComponent,
        AppMusik,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        NotesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

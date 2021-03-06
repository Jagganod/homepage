import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NotesComponent} from './notes.component';
import {NotesDetailComponent} from './note-detail.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NotesService} from './notes.service';
import {ToolsModule} from '../directives/tools.module';


@NgModule({
    imports: [
        CommonModule,  // ngIf, ngFor
        FormsModule,
        NgbModule,
        ToolsModule
    ],
    declarations: [
        NotesComponent, NotesDetailComponent
    ],
    entryComponents: [],
    providers: [
        // { provide: ErrorHandler, useClass: CustomErrorHandler },
        // { provide: BASE_URL, useValue: 'http://www.angular.at/api'},
        NotesService
    ],
    exports: [
        NotesComponent
    ]
})
export class NotesModule {
}

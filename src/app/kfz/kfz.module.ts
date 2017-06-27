import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {KfzComponent} from './kfz.component';
import {KfzSearchService} from './kfz-search.service';
import {ToolsModule} from '../directives/tools.module';


@NgModule({
    imports: [
        CommonModule,  // ngIf, ngFor
        FormsModule,
        NgbModule,
        ToolsModule
    ],
    declarations: [
        KfzComponent
    ],
    entryComponents: [],
    providers: [
        // { provide: ErrorHandler, useClass: CustomErrorHandler },
        // { provide: BASE_URL, useValue: 'http://www.angular.at/api'},
        KfzSearchService
    ],
    exports: [
        KfzComponent
    ]
})
export class KfzModule {
}

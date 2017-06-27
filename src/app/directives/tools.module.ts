import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Debounce} from '../directives/debounce.directive';


@NgModule({
  imports: [
    CommonModule,  // ngIf, ngFor
    FormsModule,
    NgbModule
  ],
  declarations: [
    Debounce
  ],
  entryComponents: [],
  providers: [
  ],
  exports: [
    Debounce
  ]
})
export class ToolsModule {
}

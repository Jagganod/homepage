import {EventEmitter, ElementRef, OnInit, Directive, Input, Output} from '@angular/core';

import {NgModel} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({ selector: '[debounce]' })
export class Debounce implements OnInit {
  @Input() delay = 700;
  @Output() func: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, private model: NgModel) {
  }

  ngOnInit(): void {
    const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .map(() => this.model.value)
      .debounceTime(this.delay);

    eventStream.subscribe(input => this.func.emit(input));
  }

}

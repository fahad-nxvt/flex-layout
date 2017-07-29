import {Directive, ElementRef, Output} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[ngxSplitHandle]',
  host: {
    class: 'ngx-split-handle',
    title: 'Drag to resize'
  }
})
export class SplitHandleDirective {

  @Output() drag: Observable<{ x: number, y: number }>;

  constructor(ref: ElementRef) {
    const getMouseEventPosition = (event: MouseEvent) => ({x: event.movementX, y: event.movementY});
    const document = ref.nativeElement.ownerDocument;

    /* tslint:disable */
    const mousedown$ = Observable.fromEvent(ref.nativeElement, 'mousedown').map(getMouseEventPosition);
    const mousemove$ = Observable.fromEvent(document, 'mousemove').map(getMouseEventPosition);
    const mouseup$ = Observable.fromEvent(document, 'mouseup').map(getMouseEventPosition);

    /* tslint:enable */
    this.drag = mousedown$.switchMap(_ => mousemove$.takeUntil(mouseup$));
  }

}

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  @Input() set color( value: string) {
    this._color =  value;
    this.setStyle();
  }

  private htmlEl?: ElementRef<HTMLElement>;
  private _color: string = '#000000';

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    this.htmlEl =  el;
  }

  setStyle() {
    if ( !this.htmlEl ) return;
    this.htmlEl.nativeElement.style.color = this._color;
  }

}
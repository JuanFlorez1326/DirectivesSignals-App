import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  @Input() set color( value: string) {
    this._color =  value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  private htmlEl?: ElementRef<HTMLElement>;
  private _color: string = '#000000';

  private _errors?: ValidationErrors | null;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
    this.htmlEl =  el;
  }

  public setStyle() {
    if ( !this.htmlEl ) return;
    this.htmlEl.nativeElement.style.color = this._color;
  }

  public setErrorMessage() {
    if ( !this.htmlEl ) return;

    if ( !this._errors ) {
      this.htmlEl.nativeElement.innerHTML = 'No hay errores.';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')) {
      this.htmlEl.nativeElement.innerHTML = 'Este campo es requerido.';
      return;
    } 

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlEl.nativeElement.innerHTML = `Minimo ${current}/${min} caracteres.`;      
      return;
    }

    if (errors.includes('email')) {
      this.htmlEl.nativeElement.innerHTML = 'Este campo debe ser un Email valido.';
      return;
    }
  }

}
import { Component, ElementRef, forwardRef, OnInit, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './ba-input-number.component.html',
  styleUrls: ['./ba-input-number.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaInputNumberComponent),
    multi: true
  }],
})
export class BaInputNumberComponent implements OnInit {

  constructor() { }

  public value = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() placeholder: string;
  @Input() mode: string = 'phone';
  public modeMethod = {
    phone: () => {
      return /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    },
    integer: () => {
      return /^[\w]+$/g;
    },
    code: () => {
      return /^[0-9a-zA-Z]*$/;
    }
  }

  ngOnInit() { }

  change = (value: any) => { };
  onTouched: () => void = () => null;

  writeValue(val): void {
    this.value = val || '';
  }
  registerOnChange(fn: any): void {
    this.change = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
  }

  onChange(value: string): void {
    this.updateValue(value);
  }

  updateValue(value: string): void {
    const reg = this.modeMethod[this.mode]();
    if(this.mode == 'code'){
      if (reg.test(value)) {
        this.value = value;
      }
    } else {
      if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value;
      }
    }
   
    this.inputElement!.nativeElement.value = this.value;
    this.change(this.value);
  }

}

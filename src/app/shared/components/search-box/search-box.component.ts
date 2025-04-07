import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>;

  @Input()
 public placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  onKeyUp( term: string ):void {

    // this.onValue.emit( this.txtInput.nativeElement.value);
    this.onValue.emit( term);
    // this.txtInput.nativeElement.value = '';
  }



}

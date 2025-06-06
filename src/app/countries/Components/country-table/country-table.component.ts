import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-table',
  templateUrl: './country-table.component.html',
  styles:[
    ` img {
    width: 25px !important ;
    height: 25px !important ;
  }

  `]
})
export class CountryTableComponent {

  @Input()
  public countries : Country[] = [];

}

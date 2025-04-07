import { Component } from '@angular/core';
import { CountriesService } from '../../Services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public country: Country[] =[];

  constructor( private countriesService: CountriesService ) { }


  searchCountry( country: string) {

    this.countriesService.searchCountry( country )
      .subscribe( country => {
        this.country = country;

      })

  }
}

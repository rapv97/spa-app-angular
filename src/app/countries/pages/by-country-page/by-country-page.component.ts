import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../Services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public country: Country[] =[];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ) { }


  ngOnInit(): void {
     this.initialValue = this.countriesService.cacheStore.byCountries.term;
      this.country = this.countriesService.cacheStore.byCountries.countries;
  }


  searchCountry( country: string) {
    this.isLoading = true;

    this.countriesService.searchCountry( country )
      .subscribe( country => {
        this.country = country;
        this.isLoading = false;
      })

  }
}

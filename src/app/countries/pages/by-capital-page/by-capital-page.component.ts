import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../Services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
 public isLoading: boolean = false;
 public initialValue: string = '';

  constructor( private countriesService: CountriesService) { }


  ngOnInit(): void {
    this.initialValue =  this.countriesService.cacheStore.byCapital.term;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }


  public searchByCapital( term: string ):void {

    console.log('searchByCapital ', term);
    this.isLoading = true;

    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;

        console.log('countries', this.countries);

        this.isLoading = false;

      })


  }

}

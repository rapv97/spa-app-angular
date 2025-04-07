import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../Services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor( private activetedRoute: ActivatedRoute,
               private router: Router,
               private countriesService: CountriesService,

   ) { }

  ngOnInit(): void {

    this.activetedRoute.params
        .pipe(
          // recibe el valor del observable y devuelve un nuevo observable
          switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ))
        )
        .subscribe( country => {

          if( !country ) return this.router.navigateByUrl('');

          console.log({ country });
          return this.country = country;
          // console.log( { params: params['id'] });

          // this.searchCountry( params['id'] );
        })
  }

  searchCountry( id: string){
    this.countriesService.searchCountryByAlphaCode( id )
              .subscribe( country => {
                console.log( { country } );
              })
  }





}

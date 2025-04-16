import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, count, delay, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion:    { region:'', countries: []}
  }

  constructor(private http: HttpClient) {

    this.loadFromLocalStorage();
   }



  private getHttpCountriesRequest( url: string ):Observable<Country[]> {

    return this.http.get<Country[]>( url)
      .pipe(
        catchError( error => of ( []) ),
        // delay( 2000 ),
      );

  }

  searchCountryByAlphaCode( code: string ):Observable<Country | null>{
      return this.http.get< Country[]>(`${this.apiUrl}/alpha/${code}`)
                      .pipe(

                        map( countries => countries.length > 0 ? countries[0] : null ),

                        catchError( error => of( null ) )
                      );
  }


  // searchCapital ( capital: string ): Observable<Country[]> {

  //  return this.http.get<Country[]>(`${this.apiUrl}/capital/${capital}`)
  //                  .pipe(
  //                   /*pipe es un metodo en el que se pueden utilizar operadores
  //                   de rxjs */

  //                   // tap , sirve para efectos secundarios

  //                   // tap( rs => console.log('paso por el tap', rs) ),
  //                   // map( countries => [] ),
  //                   // tap( rs => console.log('paso por el tap 2', rs) ),

  //                   // el operador of nos permite devolver una respuesta (observable) manejable en lugar del error
  //                   catchError( error => of( [] ) )

  //                 )

  //                  ;
  // }


  //optimizacion de la funcion searchCapital
  searchCapital ( term: string ): Observable<Country[]> {

    return  this.getHttpCountriesRequest( `${this.apiUrl}/capital/${term}` )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries } ),
        tap( () => this.saveOnLocalStorage())
      );

   }

  // searchCountry( country: string): Observable<Country[]> {
  //  return this.http.get<Country[]>(`${this.apiUrl}/name/${country}`)
  //  .pipe(
  //   catchError( error => of( [] ) )
  //  );
  // }

//optimizacion de la funcion searchCountry
  searchCountry( term: string): Observable<Country[]> {
    return this.getHttpCountriesRequest(`${this.apiUrl}/name/${term}`)
        .pipe(
          tap( countries => this.cacheStore.byCountries = { term, countries } ),
          tap( () => this.saveOnLocalStorage())
        );
   }

  // searchRegion ( region: string): Observable<Country[]> {
  //   return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
  //     .pipe(
  //       catchError( error => of( [] ) )
  //     )
  // }


  //optimizacion de la funcion searchRegion
  searchRegion ( region: Region): Observable<Country[]> {
    return this.getHttpCountriesRequest(`${this.apiUrl}/region/${region}`)
        .pipe(
          tap( countries => this.cacheStore.byRegion = { region, countries}),
          tap( () => this.saveOnLocalStorage())
        );
  }

 private  saveOnLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')!);
  }
}

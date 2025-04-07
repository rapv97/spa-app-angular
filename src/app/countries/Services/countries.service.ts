import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { catchError, count, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string ):Observable<Country | null>{
      return this.http.get< Country[]>(`${this.apiUrl}/alpha/${code}`)
                      .pipe(

                        map( countries => countries.length > 0 ? countries[0] : null ),

                        catchError( error => of( null ) )
                      );
  }


  searchCapital ( capital: string ): Observable<Country[]> {

   return this.http.get<Country[]>(`${this.apiUrl}/capital/${capital}`)
                   .pipe(
                    /*pipe es un metodo en el que se pueden utilizar operadores
                    de rxjs */

                    // tap , sirve para efectos secundarios

                    // tap( rs => console.log('paso por el tap', rs) ),
                    // map( countries => [] ),
                    // tap( rs => console.log('paso por el tap 2', rs) ),

                    // el operador of nos permite devolver una respuesta (observable) manejable en lugar del error
                    catchError( error => of( [] ) )

                  )

                   ;
  }

  searchCountry( country: string): Observable<Country[]> {
   return this.http.get<Country[]>(`${this.apiUrl}/name/${country}`)
   .pipe(
    catchError( error => of( [] ) )
   );
  }

  searchRegion ( region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
      .pipe(
        catchError( error => of( [] ) )
      )
  }

}

import { Component } from '@angular/core';
import { CountriesService } from '../../Services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public region: Country[] = [];

constructor( private coutriesService: CountriesService) {

}

searchRegion( region: string) {
  this.coutriesService.searchRegion( region )
      .subscribe( region => {
        this.region = region;
      })
}


}

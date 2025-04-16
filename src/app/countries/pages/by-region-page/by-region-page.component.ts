import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../Services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public region: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

constructor( private coutriesService: CountriesService) {

}

  ngOnInit(): void {

    this.selectedRegion = this.coutriesService.cacheStore.byRegion.region;
    this.region = this.coutriesService.cacheStore.byRegion.countries;
  }

searchRegion( region: Region) {

  this.isLoading = true;
  this.selectedRegion = region;

  this.coutriesService.searchRegion( region )
      .subscribe( region => {
        this.region = region;
        this.isLoading = false;
      }) ;
}


}

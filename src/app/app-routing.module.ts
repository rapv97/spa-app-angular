import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes:Routes = [
  // {
  // path: '',
  // component: HomePageComponent

  // },

  // {
  //   path: 'about',
  //   component: AboutPageComponent
  // },
  // {
  //   path: 'contact',
  //   component: ContactPageComponent
  // },
  {
    //para carga perezosa o lazy load, se carga bajo demanda es decir solo cuando se necesita
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule)
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],

  exports: [
    RouterModule,
  ],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }

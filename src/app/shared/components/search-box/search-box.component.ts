import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {



 /* Debuncer
 consiste en esperar que el usuario deje de escribir
 para hacer la busqueda o peticion a la API con lo que el usuario
 ha escrito.
 */

  // @ViewChild('txtInput')
  // public txtInput!: ElementRef<HTMLInputElement>;

  /*  SUBJECT ES UN TIPO ESPECIAL DE OBSERVABLE QUE EMITE VALORES y
   es posible usar la subscripcion para escuchar los valores que emite
   tambien .pipe . tap . map y demas metodos de los observables


   */
private debouncer: Subject<string> = new Subject<string>();
// private debouncer = new Subject<string>(); FORMA MAS CORTA

private debouncerSubscription?: Subscription;

  @Input()
 public placeholder:string = '';

 @Input()
 public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();


  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(

      /*  hasta que el observable deje de emitir valores por un segundo
         o segun sea el configurado en el debounceTime,
         se ejecutara el siguiente observable y le pasara el valor que contiene
         para que haga la busqueda, en este caso el subscribe.  */

      debounceTime(1000)
    )
    .subscribe( value => {
      /* cuando se tenga un subscribe que \
       no este escuchando peticiones de un servicio, se debe limpiar la subscripcion
       para evitar que se quede escuchando y se mantenga la memoria al minimo
       y no se generen fugas de memoria.

       */


      this.onDebounce.emit( value );
      // console.log('debouncer ', value);


    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();

  }


  onKeyUp( term: string ):void {

    // this.onValue.emit( this.txtInput.nativeElement.value);
    this.onValue.emit( term);
    // this.txtInput.nativeElement.value = '';
  }

  onKeyPress( searchTerm: string) {
    // console.log('searchTerm', searchTerm);
    this.debouncer.next( searchTerm )

  }



}

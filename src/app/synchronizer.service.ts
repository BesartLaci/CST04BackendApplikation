import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient } from 'src/app/models/ingridient';
import { Chocolate } from 'src/app/models/chocolate';
import { Package } from 'src/app/models/package';
import { Order } from 'src/app/models/order';
import { Shape } from 'src/app/models/shape';
import { Customer } from 'src/app/models/customer';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Request-Headers': 'Content - Type',
    'Content-Type': 'application/json'
  })

};

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {


  //private serviceUrl = 'http://localhost:8090/AppServiceService/';  
  private serviceUrl = 'http://wi-gate.technikum-wien.at:60935/AppServiceService/'; // URL to web api



  constructor(private http: HttpClient) { }


  ////////// Helper Methods - Eror Handling //////////


  getIsAlive(): Observable<boolean> {
    return this.http.get<boolean>(this.serviceUrl + 'IsAlive');
    //.pipe(catchError(this.handleError('isAlive', [])));      
  }

  private log(message: string) {
    //this.messageService.add('HeroService: ' + message);
    //if we would like to log data transpher
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //// TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //// TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  ////////// Get Methods //////////

  // TODO: Wenn Server funktioniert, Ursache für Fehler suchen
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.serviceUrl + 'QueryIngredients')
      .pipe(
      catchError(this.handleError('getIngredients', []))
      );
  }

  getIngredientsWithChocoladeId(id: AAGUID): Observable<Ingredient[]> {
    const url = `${this.serviceUrl + 'QueryIngredientsByChocolateId'}/${id}`;
    return this.http.get<Ingredient[]>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Ingredient[]>(`getHero id=${id}`))
    );
  }


  getChocolatesWithIngredients(): Observable<Chocolate[]> {
    return this.http.get<Chocolate[]>(this.serviceUrl + 'QueryChocolatesWithIngredients')
      .pipe(
      catchError(this.handleError('getChocolates', []))
      );
  }

  getPackagesWithChocolates(): Observable<Package[]> {
    return this.http.get<Package[]>(this.serviceUrl + 'QueryPackagesWithChocolatesAndIngredients')
      .pipe(
      catchError(this.handleError('getChocolates', []))
      );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.serviceUrl + 'QueryOrders')
      .pipe(
      catchError(this.handleError('getOrders', []))
      );
  }

  getCustomerWithCustomer(id: AAGUID): Observable<Customer[]> {
    const url = `${this.serviceUrl + 'QueryCustomerByCustomerId'}/${id}`;
    return this.http.get<Customer[]>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Customer[]>(`getCustomer id=${id}`))
    );
  }

  getShapes(): Observable<Shape[]> {
    return this.http.get<Shape[]>(this.serviceUrl + 'QueryShapes')
      .pipe(
      catchError(this.handleError('getShapes', []))
      );
  }



  ////////// Update Methods //////////


  updateIngredient(ingredient: Ingredient): Observable<boolean> {

    return this.http.post(this.serviceUrl + 'UpdateIngredient', ingredient, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateIngredient'))
    );
  }

  updateChocolate(chocolate: Chocolate): Observable<boolean> {

    return this.http.post(this.serviceUrl + 'UpdateChocolate', chocolate, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateChocolate'))
    );
  }

  updatePackage(updatePackage: Chocolate): Observable<boolean> {

    return this.http.post(this.serviceUrl + 'UpdateChocolate', updatePackage, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatePackage'))
    );
  }

  ////////// Insert Methods //////////

  createNewIngredient(newIngredient: Ingredient): Observable<boolean> {
    return this.http.post(this.serviceUrl + 'InsertIngredient', newIngredient, httpOptions).pipe(
      catchError(this.handleError<any>('createNewIngredient'))
    );
  }

  createNewChocolate(newChocolate: Chocolate): Observable<boolean> {
    return this.http.post(this.serviceUrl + 'InsertChocolate', newChocolate, httpOptions).pipe(
      catchError(this.handleError<any>('createNewChocolate '))
    );
  }

  createNewPackage(newPackage: Package): Observable<boolean> {
    return this.http.post(this.serviceUrl + 'InsertPackage', newPackage, httpOptions).pipe(
      catchError(this.handleError<any>('createNewPackage '))
    );
  }

}

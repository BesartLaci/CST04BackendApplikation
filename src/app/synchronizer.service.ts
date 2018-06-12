import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient } from 'src/app/models/ingridient';
import { Chocolate } from 'src/app/models/chocolate';
import { Package } from 'src/app/models/package';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    //'Authorization': 'authkey',
    //'userid': '1'
    'Content-Type': 'application/json'
    //'apikey': this.apikey,
    //'appkey': this.appkey
  })
  //params: new HttpParams().set('program_id', this.program_id)
};

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  
  private serviceUrl = 'http://localhost:8733/AppServiceService/';  // URL to web api
 
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


  getChocolatesWithIngredients(): Observable<Chocolate[]> {
    return this.http.get<Chocolate[]>(this.serviceUrl + 'QueryChocolatesWithIngredients')
      .pipe(
      catchError(this.handleError('getChocolates', []))
      );
  }

  getPackagesWithChocolates(): Observable<Package[]> {
    return this.http.get<Package[]>(this.serviceUrl + 'QuerytPackagesWithChocolates')
      .pipe(
      catchError(this.handleError('getChocolates', []))
      );
  }



    ////////// Update Methods //////////


  updateIngredient(ingredient: Ingredient): Observable<boolean> {
    return this.http.put(this.serviceUrl + 'UpdateIngredient', ingredient, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateIngredient'))
    );
  }



}

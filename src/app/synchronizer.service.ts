import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ingredient } from 'src/app/models/ingridient';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  
  private serviceUrl = 'http://localhost:8733/AppServiceService/';  // URL to web api
 
  constructor(private http: HttpClient) { }


  getIsAlive(): Observable<boolean> {
    return this.http.get<boolean>(this.serviceUrl + 'IsAlive');
    //  .pipe(
    //  catchError(this.handleError('isAlive', []))
    //);      
  }


  // TODO: Wenn Server funktioniert, Ursache für Fehler suchen
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.serviceUrl + 'QueryIngredients')
      .pipe(
      catchError(this.handleError('getIngredients', []))
      );
  }

  updateIngredient(ingredient: Ingredient): Observable<any> {
    return this.http.put(this.serviceUrl + 'UpdateIngredient', ingredient, httpOptions).pipe(
      //tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateIngredient'))
    );
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

}

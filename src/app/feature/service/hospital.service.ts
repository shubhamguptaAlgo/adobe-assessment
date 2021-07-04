import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private _http: HttpClient) { }

    /**
   * function to call get api
   * @param url: api url
   * @param params: query params object
   * @param headers: headers to pass in api call
   */
     get(url: string, params?: any, headers?: any) {
      return this._http.get(url, {
        params,
        headers
      })
    }
  
  
    /**
    * 
    * @param url: api url
    * @param body: data to send in body
    * @param headers: headers to pass in api call
    * function to call post api and returns a observable
    */
   post(url: string, body: any, params?:any, headers?: any) {
    return this._http.post(url, body, { headers, params })
    }
  
    put(url: string, body: any, params?:any, headers?: any) {
      return this._http.put(url, body, { headers, params })
        .pipe(
          map((res: any) => {
            return res;
          }),
          catchError((err)=>{
            if(err instanceof HttpErrorResponse){
              err = err.error ? err.error.errors: err.error;
            }
            return throwError(err);
          })
        )
      }
    delete(url: string, body: any, params?:any, headers?: any) {
      return this._http.delete(url, params)
        .pipe(
          map((res: any) => {
            return res;
          }),
          catchError((err)=>{
            if(err instanceof HttpErrorResponse){
              err = err.error ? err.error.errors: err.error;
            }
            return throwError(err);
          })
        )
      }
  
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8000/api/login_check';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API, {
      username,
      password
    }, httpOptions)
  }
  
}
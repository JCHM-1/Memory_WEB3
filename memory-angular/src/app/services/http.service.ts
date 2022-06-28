import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAggregateList(){
    this.http.get<any>('http://localhost:8000/api/admin/aggregate').subscribe(
      response => {
        console.log(response);
      }
    )
      ;
  }

  getPlayersList(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/admin/players');
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: string;
  aantSpellen: number;
  aantSpelers: number;

  constructor(private http: HttpClient) {
    this.token = ""
    this.aantSpellen = 0
    this.aantSpelers = 0
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? ""
    this.getAggregateList()

  }

  getAggregateList() {
    return this.http.get<any>('http://localhost:8000/api/admin/aggregate', {
      headers: {
        'Authorization': `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      tap( // Log the result or error
        {
          next: (data) => data,
          error: () => {
            // refer to error page
            window.alert("Je bent geen admin")
            window.close()
          }
        }
      )
    ).subscribe(response => {
      this.aantSpellen = response[0]['aantal_spellen']
      this.aantSpelers = response[1]['aantal_spelers']
    })
  }
}

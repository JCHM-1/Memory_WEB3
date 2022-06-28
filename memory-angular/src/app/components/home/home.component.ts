import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";

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
    this.http.get<any>('http://localhost:8000/api/admin/aggregate', {
      headers: {
        'Authorization': `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe(
      response => {
        this.aantSpellen = response[0]['aantal_spellen']
        this.aantSpelers = response[1]['aantal_spelers']
        console.log(this.aantSpellen)
        if(response.status == 200){
          console.log(response)
        }
      });
  }
}

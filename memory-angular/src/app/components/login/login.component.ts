import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { tap } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string;
  username: string;
  email: string;

  constructor(private http: HttpClient) { 
    this.token = ""
    this.username = ""
    this.email = ""
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? ""
  }

  // getPlayerList() {
  //   return this.http.get<any>('http://localhost:8000/api/admin/players', {
  //     headers: {
  //       'Authorization': `bearer ${this.token}`,
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }).pipe(
  //     tap( // Log the result or error
  //       {
  //         next: (data) => data,
  //         error: () => {
  //           // refer to error page
  //           window.alert("Je bent geen admin")
  //         }
  //       }
  //     )
  //   ).subscribe(response => {
  //     for
  //   })
  // }
  // }

}

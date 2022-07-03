import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  token: string | null;
  players: { username: string, email: string }[]

constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.players = []
    this.token = ""
  }


  ngOnInit(): void {
    this.token =this.tokenStorage.getToken() as string
    console.log(this.token)
    this.getPlayerList()

  }

  getPlayerList() {
    this.http.get<any>('http://localhost:8000/api/admin/players', {
      headers: {
        'Authorization': `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).subscribe(
      response => {
        this.players = response;
        console.log(this.players)
      });
  }

}

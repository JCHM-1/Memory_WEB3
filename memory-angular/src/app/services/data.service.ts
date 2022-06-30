import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { gameData, playerData } from '../models/models'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public gameData: gameData[];
  public playerData: playerData[];
  token: string;


  constructor(private http: HttpClient) {
    this.token = ""
    this.gameData = []
    this.playerData = []

  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? ""
    this.getAggregateList()
    this.getPlayersList()

  }

  getAggregateList() {
    this.http.get<any>('http://localhost:8000/api/admin/aggregate', {
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
           window.blur()
            window.alert("Je bent geen admin")
            window.close()
          }
        }
      )
    ).subscribe(response => {
      this.gameData=[{
        aantSpelers: response[0]['aantal_spellen'],
        aantSpellen: response[1]['aantal_spelers'],
        apis: response[3]['api']
      }];
    })
  }

  getPlayersList(){
    this.http.get<any>('http://localhost:8000/api/admin/players', {
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
            window.blur()
            window.alert("Je bent geen admin")
            window.close()
          }
        }
      )
    ).subscribe(response => {
      this.playerData = response;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import { gameData } from '../../models/models'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})
export class HomeComponent implements OnInit{
  token: string;

  constructor(private dataService: DataService) {
    this.token = ""
    console.log(dataService.playerData)
  }


  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? ""
  }


}

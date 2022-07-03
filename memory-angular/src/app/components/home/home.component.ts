import { Component, OnInit } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { gameData } from '../../models/models'
import {TokenStorageService} from "../../services/token-storage.service";
import jwt_decode from 'jwt-decode'
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  isLoggedIn:boolean = true;
  username: string = "";
  object: any;

  constructor(private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if (this.tokenStorage.getToken() === null) {
      this.isLoggedIn = false
      console.log("logged in false blijkbaar")
    } else {
      this.object = jwt_decode(this.tokenStorage.getToken() as string)
      let date = new Date()
      let exp = new Date(this.object.exp * 1000)

      if(exp <= date){
        this.tokenStorage.signOut()
        this.router.navigate([''])

      } else {

        console.log(this.isLoggedIn)
        this.username = this.object.username
      }
    }
  }


}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  isLoggedIn = true;
  token = '';
  object: any;

  constructor(private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken() === null) {
      this.isLoggedIn = false
    } else {
      this.object = jwt_decode(this.tokenStorage.getToken() as string)
      let exp = new Date(this.object.exp * 1000)
      let date = new Date()
      if(exp <= date){
        this.tokenStorage.signOut()
        this.router.navigate([''])
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false
    this.tokenStorage.signOut();
    this.router.navigate([''])

  }

}

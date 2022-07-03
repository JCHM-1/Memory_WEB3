import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  isLoggedIn = true;
  token = '';

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken() === null) {
      this.isLoggedIn = false
    };

    console.log(this.isLoggedIn)
    this.token = this.tokenStorage.getToken() as string;
  }

  logout(): void {
    this.isLoggedIn = false
    this.tokenStorage.signOut();
  }

}

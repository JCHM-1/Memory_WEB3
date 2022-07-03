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

  constructor(private tokenStorage: TokenStorageService) {
    
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken === null) {
      this.isLoggedIn = false
    };
    this.token = this.tokenStorage.getToken() as string;
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

}

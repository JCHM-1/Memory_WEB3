import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private dataService: DataService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.dataService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }
}

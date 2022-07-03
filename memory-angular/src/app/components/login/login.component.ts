import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router} from "@angular/router";
import jwt_decode from "jwt-decode";


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
  object: any;

  constructor(private dataService: DataService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

      this.object = jwt_decode(this.tokenStorage.getToken() as string)
      let date = new Date()
      let exp = new Date(this.object.exp * 1000)

      if(exp <= date){
        this.tokenStorage.signOut()
        this.router.navigate(['login'] )
      }
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;
    this.dataService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate([''], {relativeTo: this.route}).then(() => {
          window.location.reload();
        });

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }
}

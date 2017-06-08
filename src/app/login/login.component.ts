import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    grant_type: 'password',
    client_id: '1',
    client_secret: 'ptmalrhUcINWGl0HyMM0Ji6IG5xGC6F7SshLKrWF',
    username: '',
    password: '',
    scope: ''
  };

  constructor(private http: Http,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http
        .post('http://localhost:8000/oauth/token', this.user)
        .toPromise()
        .then(response => this.tokenService.token = response.json())
        .catch((error: any) => {
            if (error.status === 500) {
                console.log(error.status);
            } else if (error.status === 400) {
                console.log(error.status);
            } else if (error.status === 409) {
                console.log(error.status);
            } else if (error.status === 406) {
                console.log(error.status);
            }
        });

    this.router.navigate(['/dashboard']);
  }

  goToRegister() {
      this.router.navigate(['/register']);
  }
}

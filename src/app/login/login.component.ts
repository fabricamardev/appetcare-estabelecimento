import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../assets/css/material-kit.css']
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
    redirectAfterLogin = ['/dashboard'];

    constructor(private http: Http,
        private tokenService: TokenService,
        private router: Router,
        private auth: AuthService) { }

    ngOnInit() {
    }

    login() {
        this.http
            .post('http://localhost:8000/oauth/token', this.user)
            .toPromise()
            .then(response => {
                this.auth.check = true;
                this.tokenService.token = response.json();
                this.router.navigate(this.redirectAfterLogin);
            })
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
    }
}

import { environment } from '../../environments/environment';
import { AppetAuthService } from './../services/appet-auth.service';
import { Router } from '@angular/router';
import { DefaultRequestOptionsService } from '../services/default-request-options.service';
import { AuthService } from 'angular2-social-login';
import { Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from '../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../../assets/css/material-kit.css']
})
export class LoginComponent implements OnInit {

    user = {
        grant_type: 'password',
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        username: '',
        password: '',
        scope: ''
    };
    redirectAfterLogin = ['/dashboard'];
    public check: Boolean = false;
    public isSocial: Boolean = false;
    sub: any;
    public socialUser;

    api_route: string = environment.api_address + environment.api_version + 'estabelecimentos' + '?where[email]=';

    constructor(private auth: AppetAuthService,
        public _auth: AuthService,
        private http: Http,
        public requestOptions: DefaultRequestOptionsService,
        private router: Router,
        public localStorageService: LocalStorageService) { }

    ngOnInit() {
    }

    login() {
        this.auth.login(this.redirectAfterLogin, this.user);
    }

    signIn(provider) {
        this.auth.signIn(provider).then(() => {
            this.http // email enviado ao oauth para obter token | three way authentication - implementar
                .get(this.api_route + this.user.username, this.requestOptions.merge(new RequestOptions()))
                .toPromise()
                .then(estabelecimento => {
                    this.localStorageService.setObject('estabelecimento', estabelecimento.json().result[0]);
                    this.router.navigate(['dashboard']);
                });
        });
    }
}

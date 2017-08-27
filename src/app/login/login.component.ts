import { environment } from '../../environments/environment';
import { AppetAuthService } from './../services/appet-auth.service';
import { Router } from '@angular/router';
import { DefaultRequestOptionsService } from '../services/default-request-options.service';
import { AuthService } from 'angular2-social-login';
import { Http, RequestOptions } from '@angular/http';
import { LocalStorageService } from '../services/local-storage.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
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

    redirectAfterLogin = ['/horario-funcionamento/list'];
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
        public localStorageService: LocalStorageService,
        private slimLoadingBarService: SlimLoadingBarService) { }

    ngOnInit() {
    }

    login() {
        this.slimLoadingBarService.start();
        this.auth.login(this.redirectAfterLogin, this.user).then(() => {
            this.slimLoadingBarService.complete();
        }).catch(() => this.slimLoadingBarService.complete());
    }

    signIn(provider) {
        this.slimLoadingBarService.start();
        this.auth.signIn(provider).then((data) => {
            console.log(data);
            this.auth.logout();
            this.slimLoadingBarService.complete();
            /*this.http // email enviado ao oauth para obter token | three way authentication - implementar
                .get(this.api_route + this.user.username, this.requestOptions.merge(new RequestOptions()))
                .toPromise()
                .then(estabelecimento => {
                    this.localStorageService.setObject('estabelecimento', estabelecimento.json().result[0]);
                    this.slimLoadingBarService.complete();
                    this.router.navigate(['dashboard']);
                });*/
        });
    }
}

import { environment } from '../../environments/environment';
import { Estabelecimento } from '../perfil/estabelecimento';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../../assets/css/material-kit.css']
})

export class RegisterComponent implements OnInit {

    user = {
        name: '',
        email: '',
        estabelecimento_id: '',
        password: '',
    };

    estabelecimento: Estabelecimento = new Estabelecimento();

    api_route: string = environment.api_address + 'estabelecimentos';

    constructor(private http: Http,
        private router: Router) { }

    register() {
        this.storeEstabelecimento();
        this.storeUser();
        this.router.navigate(['/login']);
    }

    private storeUser() {
        this.http
            .post(environment.users_url, this.user)
            .toPromise()
            .then(response => {})
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

    private storeEstabelecimento() {
        this.estabelecimento.nome = this.user.name;
        this.estabelecimento.email = this.user.email;

        this.http
            .post(this.api_route, this.estabelecimento)
            .toPromise()
            .then(response => {})
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

    ngOnInit() {
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

}

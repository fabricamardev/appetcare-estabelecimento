import { AuthService } from './../services/auth.service';
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
        client_id: '1',
        client_secret: 'ptmalrhUcINWGl0HyMM0Ji6IG5xGC6F7SshLKrWF',
        username: '',
        password: '',
        scope: ''
    };
    redirectAfterLogin = ['/dashboard'];

    constructor(private auth: AuthService) { }

    ngOnInit() {
    }

    login() {
        this.auth.login(this.redirectAfterLogin, this.user);
    }
}

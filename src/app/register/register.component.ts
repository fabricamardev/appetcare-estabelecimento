import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    user = {
        name: '',
        email: '',
        password: '',
    };

    constructor(private http: Http,
        private router: Router) { }

    register() {
        this.http
            .post('http://localhost:8000/api/users', this.user)
            .toPromise()
            .then(response => this.router.navigate(['/login']))
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

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    grant_type: 'password',
    client_id: '1',
    client_secret: 'EjoP9e82HMsFJhr6QcXuAeV93l40Sh7wsUjPTJoL',
    username: '',
    password: ''
  };

  constructor(private http: Http) { }

  ngOnInit() {
  }

  login() {
    this.http
        .post('http://localhost:8000/api/oauth/token', this.user)
        .toPromise()
        .then(response => console.log(response));
  }
}

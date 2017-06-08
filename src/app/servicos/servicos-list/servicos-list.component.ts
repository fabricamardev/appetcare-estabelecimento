import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.css']
})
export class ServicosListComponent implements OnInit {

  servicos: Array<Servico> = [];

  constructor(private http: Http,
              private tokenService: TokenService,
              private auth: AuthService) {}

  ngOnInit() {
    this.getServicos();
  }

  getServicos() {
    const requestOptions = new RequestOptions();
    requestOptions.headers = new Headers();
    requestOptions.headers.set('Authorization', `Bearer ${this.tokenService.token['access_token']}`);
    requestOptions.headers.set('Content-Type', 'application/json');
    this.http
        .get('http://localhost:8000/api/v1/especies', requestOptions)
        .toPromise()
        .then(response => this.servicos = response.json().data);
  }

}

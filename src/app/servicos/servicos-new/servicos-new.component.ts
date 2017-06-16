import { environment } from './../../../environments/environment';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';
import { AppetAuthService } from '../../services/appet-auth.service';
import { Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../servico';
import { NotificationsService } from 'angular2-notifications';
import { LocalStorageService } from '../../services/local-storage.service';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'app-servicos-new',
  templateUrl: './servicos-new.component.html',
  styleUrls: ['./servicos-new.component.css']
})
export class ServicosNewComponent implements OnInit {

  servico: Servico;
  api_route: string = environment.api_address + environment.api_version + 'servicos';

  constructor(private http: Http,
    private auth: AppetAuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService,
    public localStorageService: LocalStorageService,
    private router: Router) {
  }

  ngOnInit() {
    this.servico = new Servico();
  }

  setServico(servico) {
    this.servico = servico;
  }

  salvar() {
    this.servico.estabelecimento_id = this.localStorageService.getObject('estabelecimento').id;
    this.http
      .post(this.api_route, this.servico, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.router.navigate(['servicos/list']);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.salvar();
        }
      });
  }
}

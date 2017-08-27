import { environment } from './../../../environments/environment';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';
import { AppetAuthService } from '../../services/appet-auth.service';
import { Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioFuncionamento } from '../horario-funcionamento';
import { NotificationsService } from 'angular2-notifications';
import { Estabelecimento } from '../../perfil/estabelecimento';
import { LocalStorageService } from '../../services/local-storage.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import 'rxjs/add/operator/toPromise';

declare var swal: any;

@Component({
  moduleId: module.id,
  selector: 'app-horario-funcionamento-new',
  templateUrl: './horario-funcionamento-new.component.html',
  styleUrls: ['./horario-funcionamento-new.component.css']
})
export class HorarioFuncionamentoNewComponent implements OnInit {

  horarioFuncionamento: HorarioFuncionamento;
  estabelecimento: Estabelecimento;
  api_route: string = environment.api_address + environment.api_version + 'funcionamento';
  api_route_get: string = environment.api_address + environment.api_version + 'funcionamento' + '?where[estabelecimento_id]=';

  constructor(private http: Http,
    private auth: AppetAuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService,
    public localStorageService: LocalStorageService,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService) {
  }

  ngOnInit() {
    this.horarioFuncionamento = new HorarioFuncionamento();
    this.estabelecimento = this.localStorageService.getObject('estabelecimento');

    this.http
      .get(this.api_route_get + this.estabelecimento.id, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        if (response.json().result.length !== 0) {
          swal({
            title: 'Erro',
            text: 'Não é possível cadastrar um novo horário de funcionamento.',
            type: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.router.navigate(['horario-funcionamento/list']);
          });
        }
      });
  }

  setServico(horarioFuncionamento) {
    this.horarioFuncionamento = horarioFuncionamento;
  }

  salvar() {
    this.horarioFuncionamento.estabelecimento_id = this.localStorageService.getObject('estabelecimento').id;
    this.http
      .post(this.api_route, this.horarioFuncionamento, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.router.navigate(['horario-funcionamento/list']);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.salvar();
        }
      });
  }
}

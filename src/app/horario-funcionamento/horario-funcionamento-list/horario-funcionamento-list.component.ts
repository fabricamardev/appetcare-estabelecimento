import { HorarioFuncionamentoService } from '../horario-funcionamento.service';
import { environment } from './../../../environments/environment';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';
import { AppetAuthService } from '../../services/appet-auth.service';
import { Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HorarioFuncionamento } from '../horario-funcionamento';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Estabelecimento } from '../../perfil/estabelecimento';
import { LocalStorageService } from '../../services/local-storage.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import 'rxjs/add/operator/toPromise';

declare var swal: any;

@Component({
  moduleId: module.id,
  selector: 'app-horario-funcionamento-list',
  templateUrl: './horario-funcionamento-list.component.html',
  styleUrls: ['./horario-funcionamento-list.component.css']
})

export class HorarioFuncionamentoListComponent implements OnInit {

  horariosDeFuncionamento: Array<HorarioFuncionamento> = [];
  horarioFuncionamento: HorarioFuncionamento = new HorarioFuncionamento();
  estabelecimento: Estabelecimento;

  api_route: string = environment.api_address + environment.api_version + 'funcionamento';
  api_route_get: string = environment.api_address + environment.api_version + 'funcionamento' + '?where[estabelecimento_id]=';

  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private http: Http,
    private auth: AppetAuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService,
    private router: Router,
    public localStorageService: LocalStorageService,
    public horarioFuncionamentoService: HorarioFuncionamentoService,
    private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.estabelecimento = this.localStorageService.getObject('estabelecimento');
    this.getServicos().then(() => {
      this.slimLoadingBarService.complete();
    })
    .catch(() => {
      this.slimLoadingBarService.complete();
    });
  }

  getServicos() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.api_route_get + this.estabelecimento.id, this.requestOptions.merge(new RequestOptions()))
        .toPromise()
        .then(response => {
          this.horariosDeFuncionamento = response.json().result;
          resolve();
        })
        .catch((error: any) => {
          if (error.status === 401) {
            this.auth.refreshToken();
            this.getServicos();
          } else {
            reject();
          }
        });
    });
  }

  delete(id) {
    swal({
      title: 'Deseja realmente remover este registro?',
      text: 'Esta ação é irreverssível',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(() => {
      this.http
        .delete(this.api_route + '/' + id, this.requestOptions.merge(new RequestOptions()))
        .toPromise()
        .then(response => {
          console.log(response.json());
          swal(
            'Excuído!',
            'O registro foi removido com sucesso',
            'success'
          );
          this.getServicos();
        })
        .catch((error: any) => {
          if (error.status === 401) {
            this.auth.refreshToken();
            this.delete(id);
          }
        });
    }).catch(swal.noop);
  }

  add() {
    this.http
    .get(this.api_route_get + this.estabelecimento.id, this.requestOptions.merge(new RequestOptions()))
    .toPromise()
    .then(response => {
      if (response.json().result.length === 0) {
        this.router.navigate(['horario-funcionamento/new']);
      } else {
        swal({
          title: 'Erro',
          text: 'Não é possível cadastrar um novo horário de funcionamento. Edite o registro existente!',
          type: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Ok',
        });
      }
    })
    .catch((error: any) => {
      if (error.status === 401) {
        this.auth.refreshToken();
        this.add();
      }
    });
  }

  edit(id) {
    this.http
      .get(this.api_route + '/' + id, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        this.horarioFuncionamentoService.horarioFuncionamento = response.json();
        this.router.navigate(['horario-funcionamento/edit']);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.getServicos();
        }
      });
  }
}

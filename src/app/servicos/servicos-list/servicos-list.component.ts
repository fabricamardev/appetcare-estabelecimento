import { environment } from './../../../environments/environment';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';
import { AppetAuthService } from '../../services/appet-auth.service';
import { Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { ServicoService } from '../servico.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Estabelecimento } from '../../perfil/estabelecimento';
import { LocalStorageService } from '../../services/local-storage.service';
import 'rxjs/add/operator/toPromise';

declare var swal: any;

@Component({
  moduleId: module.id,
  selector: 'app-servicos-list',
  templateUrl: './servicos-list.component.html',
  styleUrls: ['./servicos-list.component.css']
})

export class ServicosListComponent implements OnInit {

  servicos: Array<Servico> = [];
  servico: Servico = new Servico();
  estabelecimento: Estabelecimento;

  api_route: string = environment.api_address + environment.api_version + 'servicos';
  api_route_get: string = environment.api_address + environment.api_version + 'servicos' + '?where[estabelecimento_id]=';

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
    public servicoService: ServicoService) { }

  ngOnInit() {
    this.estabelecimento = this.localStorageService.getObject('estabelecimento');
    this.getServicos();
  }

  getServicos() {
    this.http
      .get(this.api_route_get + this.estabelecimento.id, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => this.servicos = response.json().result)
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.getServicos();
        }
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

  edit(id) {
    this.http
      .get(this.api_route + '/' + id, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        this.servicoService.servico = response.json();
        this.router.navigate(['servicos/edit']);
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.getServicos();
        }
      });
  }
}

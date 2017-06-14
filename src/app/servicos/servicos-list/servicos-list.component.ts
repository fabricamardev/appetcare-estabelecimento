import { DefaultRequestOptionsService } from './../../services/default-request-options.service';
import { AuthService } from '../../services/auth.service';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { NotificationsService } from 'angular2-notifications';
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
  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private http: Http,
    private auth: AuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getServicos();
  }

  getServicos() {
    this.http
      .get('http://localhost:8000/api/v1/especies', this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => this.servicos = response.json().data)
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.getServicos();
        }
      });
  }

  delete() {
    swal({
      title: 'Deseja realmente remover este registro?',
      text: 'Esta ação é irreverssível',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(function () {
      swal(
        'Excuído!',
        'O registro foi removido com sucesso',
        'success'
      )
    }).catch(swal.noop);
  }

  edit() {
    this._notificationsService.success(
      'Some Title',
      'Some Some ContentSome ContentSome ContentSome Content',
      {
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      }
    );
  }
}

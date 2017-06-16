import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from '../servico';
import { ServicoService } from '../servico.service';
import { Http, RequestOptions } from '@angular/http';
import { environment } from './../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { AppetAuthService } from '../../services/appet-auth.service';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';

@Component({
  selector: 'app-servicos-edit',
  templateUrl: './servicos-edit.component.html',
  styleUrls: ['./servicos-edit.component.css']
})
export class ServicosEditComponent implements OnInit {

  servico: Servico;
  api_route: string = environment.api_address + environment.api_version + 'servicos/';

  constructor(private servicoService: ServicoService,
    private http: Http,
    private auth: AppetAuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService,
    private router: Router) { }

  ngOnInit() {
    this.servico = this.servicoService.servico;
  }

  editar() {
    this.http
      .put(this.api_route + this.servico.id, this.servico, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.router.navigate(['servicos/list']);
        this._notificationsService.success(
          'Some Title',
          'Some Some ContentSome ContentSome ContentSome Content',
          {
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          }
        );
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.auth.refreshToken();
          this.editar();
        }
      });
  }

}

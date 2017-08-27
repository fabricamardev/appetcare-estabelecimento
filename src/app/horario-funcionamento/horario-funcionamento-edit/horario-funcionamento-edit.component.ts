import { HorarioFuncionamentoService } from '../horario-funcionamento.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioFuncionamento } from '../horario-funcionamento';
import { Http, RequestOptions } from '@angular/http';
import { environment } from './../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { AppetAuthService } from '../../services/appet-auth.service';
import { DefaultRequestOptionsService } from './../../services/default-request-options.service';

@Component({
  selector: 'app-horario-funcionamento-edit',
  templateUrl: './horario-funcionamento-edit.component.html',
  styleUrls: ['./horario-funcionamento-edit.component.css']
})
export class HorarioFuncionamentoEditComponent implements OnInit {

  horarioFuncionamento: HorarioFuncionamento;
  api_route: string = environment.api_address + environment.api_version + 'funcionamento/';

  constructor(private http: Http,
    public horarioFuncionamentoService: HorarioFuncionamentoService,
    private auth: AppetAuthService,
    private requestOptions: DefaultRequestOptionsService,
    private _notificationsService: NotificationsService,
    private router: Router) { }

  ngOnInit() {
    this.horarioFuncionamento = this.horarioFuncionamentoService.horarioFuncionamento;
  }

  editar() {
    this.http
      .put(this.api_route + this.horarioFuncionamento.id, this.horarioFuncionamento, this.requestOptions.merge(new RequestOptions()))
      .toPromise()
      .then(response => {
        console.log(response.json());
        this.router.navigate(['horario-funcionamento/list']);
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

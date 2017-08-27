import {
    HorarioFuncionamentoListComponent,
} from './horario-funcionamento/horario-funcionamento-list/horario-funcionamento-list.component';
import {
    HorarioFuncionamentoEditComponent,
} from './horario-funcionamento/horario-funcionamento-edit/horario-funcionamento-edit.component';
import {
    HorarioFuncionamentoNewComponent,
} from './horario-funcionamento/horario-funcionamento-new/horario-funcionamento-new.component';
import { HorarioFuncionamentoService } from './horario-funcionamento/horario-funcionamento.service';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AtendimentosAgendadosComponent } from './atendimentos-agendados/atendimentos-agendados.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { AppetAuthService } from './services/appet-auth.service';
import { AuthGuardRouterService } from './services/auth-guard-router.service';
import { DefaultRequestOptionsService } from './services/default-request-options.service';
import { EventService } from './services/event.service';
import { LocalStorageService } from './services/local-storage.service';
import { TokenService } from './services/token.service';
import { ServicoService } from './servicos/servico.service';
import { ServicosEditComponent } from './servicos/servicos-edit/servicos-edit.component';
import { ServicosListComponent } from './servicos/servicos-list/servicos-list.component';
import { ServicosNewComponent } from './servicos/servicos-new/servicos-new.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ScheduleModule } from 'primeng/primeng';
import { GMapModule } from 'primeng/primeng';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

let providers = {
  'google': {
    'clientId': '731078138311-3qrnda33cs8c0eb2msclhsk42c1vbvm2.apps.googleusercontent.com'
  },
  'facebook': {
    'clientId': '224071121444035',
    'apiVersion': 'v2.9'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServicosNewComponent,
    ServicosListComponent,
    DashboardComponent,
    RegisterComponent,
    SidebarComponent,
    PerfilComponent,
    NavBarComponent,
    LocalizacaoComponent,
    AtendimentosAgendadosComponent,
    ServicosEditComponent,
    HorarioFuncionamentoNewComponent,
    HorarioFuncionamentoEditComponent,
    HorarioFuncionamentoListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    HttpModule,
    routing,
    CurrencyMaskModule,
    GMapModule,
    Angular2SocialLoginModule,
    ScheduleModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    LocalStorageService,
    TokenService,
    AppetAuthService,
    AuthGuardRouterService,
    DefaultRequestOptionsService,
    EventService,
    ServicoService,
    HorarioFuncionamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);

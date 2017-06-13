import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AtendimentosAgendadosComponent } from './atendimentos-agendados/atendimentos-agendados.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardRouterService } from './services/auth-guard-router.service';
import { AuthService } from './services/auth.service';
import { DefaultRequestOptionsService } from './services/default-request-options.service';
import { EventService } from './services/event.service';
import { LocalStorageService } from './services/local-storage.service';
import { TokenService } from './services/token.service';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CurrencyMaskModule,
    GMapModule,
    ScheduleModule
  ],
  providers: [
    LocalStorageService,
    TokenService,
    AuthService,
    AuthGuardRouterService,
    DefaultRequestOptionsService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

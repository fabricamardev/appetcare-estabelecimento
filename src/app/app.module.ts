import { TokenService } from './services/token.service';
import { LocalStorageService } from './services/local-storage.service';
import { AuthService } from './services/auth.service';
import { routing } from './app.routing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EstabelecimentoNewComponent } from './estabelecimento/estabelecimento-new/estabelecimento-new.component';
import { ServicosNewComponent } from './servicos/servicos-new/servicos-new.component';
import { ServicosListComponent } from './servicos/servicos-list/servicos-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EstabelecimentoNewComponent,
    ServicosNewComponent,
    ServicosListComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    LocalStorageService,
    TokenService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

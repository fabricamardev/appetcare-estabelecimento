import { AuthGuardRouterService } from './services/auth-guard-router.service';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServicosListComponent } from './servicos/servicos-list/servicos-list.component';
import { ServicosNewComponent } from './servicos/servicos-new/servicos-new.component';
import { ServicosEditComponent } from './servicos/servicos-edit/servicos-edit.component';
import { HorarioFuncionamentoListComponent } from './horario-funcionamento/horario-funcionamento-list/horario-funcionamento-list.component';
import { HorarioFuncionamentoNewComponent } from './horario-funcionamento/horario-funcionamento-new/horario-funcionamento-new.component';
import { HorarioFuncionamentoEditComponent } from './horario-funcionamento/horario-funcionamento-edit/horario-funcionamento-edit.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { AtendimentosAgendadosComponent } from './atendimentos-agendados/atendimentos-agendados.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
     {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'servicos/list',
        component: ServicosListComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'servicos/edit',
        component: ServicosEditComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'servicos/new',
        component: ServicosNewComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'horario-funcionamento/list',
        component: HorarioFuncionamentoListComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'horario-funcionamento/edit',
        component: HorarioFuncionamentoEditComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'horario-funcionamento/new',
        component: HorarioFuncionamentoNewComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'localizacao',
        component: LocalizacaoComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'agendamentos',
        component: AtendimentosAgendadosComponent,
        canActivate: [AuthGuardRouterService]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardRouterService]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


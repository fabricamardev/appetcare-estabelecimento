import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServicosListComponent } from './servicos/servicos-list/servicos-list.component';
import { ServicosNewComponent } from './servicos/servicos-new/servicos-new.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

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
        component: ServicosListComponent
    },
    {
        path: 'servicos/new',
        component: ServicosNewComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'localizacao',
        component: LocalizacaoComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


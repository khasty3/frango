import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id', canActivate: [AuthGuard],
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'home', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'coleta', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coleta/coleta.module').then(m => m.ColetaPageModule)
  },
  {
    path: 'coleta-form/:coleta_id', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coleta-form/coleta-form.module').then(m => m.ColetaFormPageModule)
  },
  {
    path: 'coleta-medico-form', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coleta-medico-form/coleta-medico-form.module').then(m => m.ColetaMedicoFormPageModule)
  },
  {
    path: 'coleta-medico-item-form', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coleta-medico-item-form/coleta-medico-item-form.module').then(m => m.ColetaMedicoItemFormPageModule)
  },
   {
    path: 'roteiros', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/roteiros/roteiros.module').then(m => m.RoteirosPageModule)
  },
  {
    path: 'coletas-pending', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coletas-pending/coletas-pending.module').then(m => m.ColetasPendingPageModule)
  },
  {
    path: 'coletas-check', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coletas-check/coletas-check.module').then(m => m.ColetasCheckPageModule)
  },
  {
    path: 'coletas-check-detail/:coleta_id', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/coletas-check-detail/coletas-check-detail.module').then(m => m.ColetasCheckDetailPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'notification-detalhe/:coleta_id',
    loadChildren: () => import('./pages/notification-detalhe/notification-detalhe.module').then(m => m.NotificationDetalhePageModule)
  },
  {
    path: 'malotes',
    loadChildren: () => import('./pages/malotes/malotes.module').then(m => m.MalotesPageModule)
  },
  {
    path: 'malote-form/:clinica_id/:code_qr',
    loadChildren: () => import('./pages/malote-form/malote-form.module').then(m => m.MaloteFormPageModule)
  },
  {
    path: 'entregas',
    loadChildren: () => import('./pages/entregas/entregas.module').then(m => m.EntregasPageModule)
  },
  {
    path: 'entrega-detalhe/:entrega_id',
    loadChildren: () => import('./pages/entrega-detalhe/entrega-detalhe.module').then(m => m.EntregaDetalhePageModule)
  },
  {
    path: 'malote-report',
    loadChildren: () => import('./pages/malote-report/malote-report.module').then(m => m.MaloteReportPageModule)
  },
  {
    path: 'entrega-report',
    loadChildren: () => import('./pages/entrega-report/entrega-report.module').then(m => m.EntregaReportPageModule)
  },
  {
    path: 'solicitacoes',
    loadChildren: () => import('./pages/solicitacoes/solicitacoes.module').then(m => m.SolicitacoesPageModule)
  },
  {
    path: 'devolucoes',
    loadChildren: () => import('./pages/devolucoes/devolucoes.module').then(m => m.DevolucoesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

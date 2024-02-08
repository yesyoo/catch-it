import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { UnAuthGuard } from '../../guards/un-auth/un-auth.guard';


const routes: Routes = [
  {
    path: "", component: PublicComponent,
    canActivate: [UnAuthGuard],
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {
    path: "home", component: PublicComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: "**", redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

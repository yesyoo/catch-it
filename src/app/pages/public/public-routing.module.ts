import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { AuthGuard } from '../../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: "", component: PublicComponent,
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {
    path: "home", component: PublicComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

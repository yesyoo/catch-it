import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { BoardModule } from '../board/board.module';
import { AuthGuard } from '../../../guards/auth/auth.guard';
import { BoardComponent } from '../board/board.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, 
    canActivate: [AuthGuard],
    loadChildren: () => import('../board/board.module').then(m => m.BoardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

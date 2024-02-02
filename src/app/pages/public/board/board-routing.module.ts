import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { BoardUserComponent } from './board/board-user/board-user.component';
import { BoardCardComponent } from './board/board-card/board-card.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {
    path: '', component: BoardComponent,
    children: [
      {
        path: 'auth', component: AuthComponent
      },
      {
        path: 'user/:id', component: BoardUserComponent,
        children: [
          {
            path: 'item/:id', component: BoardCardComponent
          }
        ]
      },
      {
        path: 'item/:id', component: BoardCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }

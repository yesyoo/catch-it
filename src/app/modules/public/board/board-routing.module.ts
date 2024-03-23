import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { BoardCardComponent } from './board/board-card/board-card.component';
import { AuthComponent } from './auth/auth.component';
import { BoardUserPanelComponent } from './board/board-user-panel/board-user-panel.component';


const routes: Routes = [
  {
    path: '', component: BoardComponent,
    children: [
      {
        path: 'auth', component: AuthComponent
      },
      {
        path: 'user/:id', component: BoardUserPanelComponent,
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

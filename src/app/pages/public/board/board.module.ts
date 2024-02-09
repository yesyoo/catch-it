import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';

import { BoardItemsComponent } from './board/board-items/board-items.component';
import { BoardUserComponent } from './board/board-user/board-user.component';
import { BoardCardComponent } from './board/board-card/board-card.component';
import { BoardHeaderFilterComponent } from './board/board-header/board-header-filter/board-header-filter.component';
import { DealtypeSelectComponent } from '../../../components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from 'src/app/components/subcategory-select/subcategory-select.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { ModalModule } from '../../modal/modal.module';
import { ModalComponent } from '../../modal/modal.component';
import { BoardCardOwnerPanelComponent } from './board/board-card/board-card-owner-panel/board-card-owner-panel.component';
import { DialogModule } from 'primeng/dialog';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { BoardUserVisitorPanelComponent } from './board/board-user/board-user-visitor-panel/board-user-visitor-panel.component';
import { BoardUserOwnerPanelComponent } from './board/board-user/board-user-owner-panel/board-user-owner-panel.component';
import { BoardCardVisitorPanelComponent } from './board/board-card/board-card-visitor-panel/board-card-visitor-panel.component';
import { BoardHeaderComponent } from './board/board-header/board-header.component';
import { BoardItemsOwnerComponent } from './board/board-items/board-items-owner/board-items-owner.component';
import { BoardItemsVisitorComponent } from './board/board-items/board-items-visitor/board-items-visitor.component';


@NgModule({
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardItemsComponent,
    BoardUserComponent,
    BoardCardComponent,
    BoardHeaderFilterComponent,
    AuthComponent,
    BoardCardOwnerPanelComponent,
    BoardUserVisitorPanelComponent,
    BoardUserOwnerPanelComponent,
    BoardCardVisitorPanelComponent,
    BoardItemsOwnerComponent,
    BoardItemsVisitorComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    DealtypeSelectComponent,
    SubcategorySelectComponent,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    DialogModule,
    InputTextModule,
    ItemCardComponent
  ],
  providers: []
})
export class BoardModule { }

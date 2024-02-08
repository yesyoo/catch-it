import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { BoardHeaderComponent } from './board/board-header/board-header.component';
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


@NgModule({
  declarations: [
    BoardComponent,
    BoardHeaderComponent,
    BoardItemsComponent,
    BoardUserComponent,
    BoardCardComponent,
    BoardHeaderFilterComponent,
    AuthComponent,
    BoardCardOwnerPanelComponent
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

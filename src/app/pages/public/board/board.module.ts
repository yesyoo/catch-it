import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';

import { BoardCardComponent } from './board/board-card/board-card.component';
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

import { BoardCardVisitorPanelComponent } from './board/board-card/board-card-visitor-panel/board-card-visitor-panel.component';

import { BoardSearchPanelComponent } from './board/board-search-panel/board-search-panel.component';
import { BoardUserPanelComponent } from './board/board-user-panel/board-user-panel.component';
import { BoardSearchFilterComponent } from './board/board-search-panel/board-search-filter/board-search-filter.component';
import { BoardUserpanelOwnerComponent } from './board/board-user-panel/board-userpanel-owner/board-userpanel-owner.component';
import { BoardUserpanelAnyComponent } from './board/board-user-panel/board-userpanel-any/board-userpanel-any.component';
import { BoardCardListComponent } from './board/board-card-list/board-card-list.component';
import { BoardPreviewCardOwnerComponent } from './board/board-card-list/board-preview-card-owner/board-preview-card-owner.component';
import { BoardPreviewCardAnyComponent } from './board/board-card-list/board-preview-card-any/board-preview-card-any.component';


@NgModule({
  declarations: [
    BoardComponent,
    BoardCardComponent,
    AuthComponent,
    BoardCardOwnerPanelComponent,
    BoardCardVisitorPanelComponent,
    BoardSearchPanelComponent,
    BoardUserPanelComponent,
    BoardSearchFilterComponent,
    BoardUserpanelOwnerComponent,
    BoardUserpanelAnyComponent,
    BoardCardListComponent,
    BoardPreviewCardOwnerComponent,
    BoardPreviewCardAnyComponent
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

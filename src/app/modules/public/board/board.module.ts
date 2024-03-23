import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { BoardCardComponent } from './board/board-card/board-card.component';
import { SubcategorySelectComponent } from 'src/app/components/subcategory-select/subcategory-select.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { BoardCardOwnerPanelComponent } from './board/board-card/board-card-owner-panel/board-card-owner-panel.component';
import { DialogModule } from 'primeng/dialog';
import { BoardCardVisitorPanelComponent } from './board/board-card/board-card-visitor-panel/board-card-visitor-panel.component';
import { BoardSearchPanelComponent } from './board/board-search-panel/board-search-panel.component';
import { BoardUserPanelComponent } from './board/board-user-panel/board-user-panel.component';
import { BoardSearchFilterComponent } from './board/board-search-panel/board-search-filter/board-search-filter.component';
import { BoardUserpanelOwnerComponent } from './board/board-user-panel/board-userpanel-owner/board-userpanel-owner.component';
import { BoardUserpanelAnyComponent } from './board/board-user-panel/board-userpanel-any/board-userpanel-any.component';
import { BoardCardListComponent } from './board/board-card-list/board-card-list.component';
import { BoardPreviewCardOwnerComponent } from './board/board-card-list/board-preview-card-owner/board-preview-card-owner.component';
import { BoardPreviewCardAnyComponent } from './board/board-card-list/board-preview-card-any/board-preview-card-any.component';
import { MessageModule } from 'primeng/message'
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DealtypeSwitchComponent } from './board/board-search-panel/dealtype-switch/dealtype-switch.component';
import { BoardPreviewCardComponent } from './board/board-card-list/board-preview-card/board-preview-card.component';

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
    BoardPreviewCardComponent,
    BoardPreviewCardOwnerComponent,
    BoardPreviewCardAnyComponent,
    DealtypeSwitchComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SubcategorySelectComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class BoardModule { }

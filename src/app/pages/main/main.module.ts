import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { CardBoardComponent } from './card-board/card-board.component';
import { CardBoardHeaderComponent } from './card-board/card-board-header/card-board-header.component';
import { DealtypeSelectComponent } from 'src/app/components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from '../../components/subcategory-select/subcategory-select.component';
import { InputTextModule } from 'primeng/inputtext';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ItemCardComponent } from './card-board/item-card/item-card.component';
import { CardBoardFilterComponent } from './card-board/card-board-header/card-board-filter/card-board-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    CardBoardComponent,
    CardBoardHeaderComponent,
    ItemCardComponent,
    CardBoardFilterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DealtypeSelectComponent,
    SubcategorySelectComponent,
    InputTextModule,
    ModalModule,
    ReactiveFormsModule,
    DropdownModule, 
    TabMenuModule
  ],
  providers: [
    ModalService
  ]
})
export class MainModule { }

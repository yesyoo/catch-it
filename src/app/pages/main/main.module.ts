import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { CardBoardComponent } from './card-board/card-board.component';
import { CardComponent } from './card-board/card/card.component';
import { CardBoardHeaderComponent } from './card-board/card-board-header/card-board-header.component';
import { DealtypeSelectComponent } from 'src/app/components/dealtype-select/dealtype-select.component';
import { SubcategorySelectComponent } from '../../components/subcategory-select/subcategory-select.component';
import { InputTextModule } from 'primeng/inputtext';
import { ItemCardComponent } from 'src/app/components/item-card/item-card.component';
import { ModalModule } from '../modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    CardBoardComponent,
    CardComponent,
    CardBoardHeaderComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    DealtypeSelectComponent,
    SubcategorySelectComponent,
    InputTextModule,
    ItemCardComponent,
    ModalModule
  ]
})
export class MainModule { }

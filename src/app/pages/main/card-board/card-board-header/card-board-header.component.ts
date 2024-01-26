import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryType, SubcategoryType } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/deal-type';

@Component({
  selector: 'app-card-board-header',
  templateUrl: './card-board-header.component.html',
  styleUrls: ['./card-board-header.component.scss']
})
export class CardBoardHeaderComponent implements OnInit {

  dealType: DealType = 'donate'
  selectedSubcategory: SubcategoryType = 'adult-male-shoes'
  selectedCategory: CategoryType = 'personal-shoes'

  @Output() filter: EventEmitter<string> = new EventEmitter()
  @Output() category: EventEmitter<string> = new EventEmitter()
  @Output() deal: EventEmitter<string> = new EventEmitter()
  @Output() openFilter: EventEmitter<boolean> = new EventEmitter()

  dealParams: string = `dealType=donate`
  categoryParams: string = `collection=personal-shoes`
  subcategoryParams: string = `subcategoryType=adult-male-shoes`
  
  filterForm: boolean = false
  constructor() { }

  ngOnInit(): void {
  };
  
  updateCategoryParams(ev: {ev: Event, value: {label: string, category: CategoryType, subcategory: SubcategoryType}}): void {
    this.categoryParams = `collection=${ev.value.category}`
    this.subcategoryParams = `subcategoryType=${ev.value.subcategory}`
    this.selectedCategory = ev.value.category
    this.selectedSubcategory = ev.value.subcategory
    this.category.emit(this.path())
  };

  updateDealParams(ev: {ev: Event, value: {label: string, value: DealType}}): void {
    this.dealType = ev.value.value
    this.dealParams = `dealType=${ev.value.value}`
    this.deal.emit(this.path())
  };

  path(): string {
    return `${this.dealParams}&${this.categoryParams}&${this.subcategoryParams}`
  };

  openFilterForm(): void {
    if(!this.filterForm) {
      this.filterForm = true
    } else {
      this.filterForm = false;
      this.openFilter.emit(false)
    }
  };

  updateFilter(params: string): void {
    const path: string = `${this.dealParams}&${this.categoryParams}&${params}`
    console.log(path)
    this.filter.emit(path)
 };
}

import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { Collection, Category } from 'src/app/models/interfaces/category';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory-select',
  templateUrl: './subcategory-select.component.html',
  styleUrls: ['./subcategory-select.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CascadeSelectModule, 
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SubcategorySelectComponent implements OnInit {

  categoryList: any[];
  @Input() selectedCategory: any 
  @Output() updateCategoryType: EventEmitter<any> = new EventEmitter()
 
  constructor() { }

  ngOnInit() {

    this.categoryList = [
      {
        label: "Взрослые",
        options: [
          {
            label: "Мужская обувь",
            collection: "personal-shoes",
            category: "adult-male-shoes"
          },
          {
            label: "Мужская одежда",
            collection: "personal-clothes",
            category: "adult-male-clothes"
          },
          {
            label: "Женская обувь",
            collection: "personal-shoes",
            category: "adult-female-shoes"
          },
          {
            label: "Женская одежда",
            collection: "personal-clothes",
            category: "adult-female-clothes"
          }
        ]
      },
      {
        label: "Дети",
        options: [
          {
            label: "Одежда для мальчиков",
            collection: "personal-clothes",
            category: "child-male-clothes"
          },
          {
            label: "Одежда для девочек",
            collection: "personal-clothes",
            category: "child-female-clothes"
          },
          {
            label: "Обувь для мальчиков",
            collection: "personal-shoes",
            category: "child-male-shoes"
          },
          {
            label: "Обувь для девочек",
            collection: "personal-shoes",
            category: "child-female-shoes"
          }
        ]
      }
    ];
    this.selectedCategory = this.categoryList[0].options[0]

  };

  updateCategory(ev: {ev: Event, value: {label: string,  collection: Collection, category: Category,}}): void {
    this.updateCategoryType.emit(ev)
  };
  
}

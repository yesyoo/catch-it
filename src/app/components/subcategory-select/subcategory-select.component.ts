import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Collection, Category } from 'src/app/interfaces/category';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/services/auth-interceptor/auth-interceptor';
import { NONE_TYPE } from '@angular/compiler';
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
        label: "Personal",
        options: [
          {
            label: "Male shoes",
            collection: "personal-shoes",
            category: "adult-male-shoes"
          },
          {
            label: "Male clothes",
            collection: "personal-clothes",
            category: "adult-male-clothes"
          },
          {
            label: "Female shoes",
            collection: "personal-shoes",
            category: "adult-female-shoes"
          },
          {
            label: "Female clothes",
            collection: "personal-clothes",
            category: "adult-female-clothes"
          },
          {
            label: "Bags",
            collection: "personal-bags",
            category: "adult-bags"
          },
          {
            label: "Other",
            collection: "personal-accessories",
            category: "adult-other" 
          }
        ]
      },
      {
        label: "Kids",
        options: [
          {
            label: "Boys clothes",
            collection: "personal-clothes",
            category: "child-male-clothes"
          },
          {
            label: "Girls clothes",
            collection: "personal-clothes",
            category: "child-female-clothes"
          },
          {
            label: "Boys shoes",
            collection: "personal-shoes",
            category: "child-male-shoes"
          },
          {
            label: "Girls shoes",
            collection: "personal-shoes",
            category: "child-female-shoes"
          },
          {
            label: "School",
            collection: "kids-all",
            category: "child-school"
          },
          {
            label: "Newborn",
            collection: "kids-all",
            category: "child-newborn"
          },
          {
            label: "Other",
            collection: "kids-all",
            category: "child-other"
          }
        ]
      },
      {
        label: "Home",
        options: [
          {
            label: "Furniture",
            collection: "home-all",
            category: "home-furniture"
          },
          {
            label: "Appliances",
            collection: "home-all",
            category: "home-appliances"
          },
          {
            label: "Decor",
            collection: "home-all",
            category: "home-decor"
          },
          {
            label: "Other",
            collection: "home-all",
            category: "home-other"
          }
        ]
      },
      {
        label: "Pets",
        options: [
          {
            label: "Pets",
            collection: "pets-all",
            category: "pets-pets"
          },
          {
            label: "Accesorries",
            collection: "pets-all",
            category: "pets-accessories"
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

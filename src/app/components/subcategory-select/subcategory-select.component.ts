import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubcategoryType } from 'src/app/interfaces/category';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subcategory-select',
  templateUrl: './subcategory-select.component.html',
  styleUrls: ['./subcategory-select.component.scss'],
  standalone: true,
  imports: [
    CascadeSelectModule, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SubcategorySelectComponent implements OnInit {
  category: any[];
  selectedCategory: any
  @Output() updateCategoryType: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
    this.category = [
      {
        name: "Personal",
        subcategory: [
          {
            name: "Male shoes",
            collection: "personal-shoes",
            type: "adult-male-shoes"
          },
          {
            name: "Male clothes",
            collection: "personal-clothes",
            type: "adult-male-clothes"
          },
          {
            name: "Female shoes",
            collection: "personal-shoes",
            type: "adult-female-shoes"
          },
          {
            name: "Female clothes",
            collection: "personal-clothes",
            type: "adult-female-clothes"
          },
          {
            name: "Bags",
            collection: "personal-accessories",
            type: "adult-bags"
          },
          {
            name: "Other",
            collection: "personal-accessories",
            type: "adult-other" 
          }
        ]
      },
      {
        name: "Kids",
        subcategory: [
          {
            name: "Boys clothes",
            collection: "personal-clothes",
            type: "child-male-clothes"
          },
          {
            name: "Girls clothes",
            collection: "personal-clothes",
            type: "child-female-clothes"
          },
          {
            name: "Boys shoes",
            collection: "personal-shoes",
            type: "child-male-shoes"
          },
          {
            name: "Girls shoes",
            collection: "personal-shoes",
            type: "child-female-shoes"
          },
          {
            name: "School",
            collection: "kids-all",
            type: "child-school"
          },
          {
            name: "Newborn",
            collection: "kids-all",
            type: "child-newborn"
          },
          {
            name: "Other",
            collection: "kids-all",
            type: "child-other"
          }
        ]
      },
      {
        name: "Home",
        subcategory: [
          {
            name: "Furniture",
            collection: "home-all",
            type: "home-furniture"
          },
          {
            name: "Appliances",
            collection: "home-all",
            type: "home-appliances"
          },
          {
            name: "Decor",
            collection: "home-all",
            type: "home-decor"
          },
          {
            name: "Other",
            collection: "home-all",
            type: "home-other"
          }
        ]
      },
      {
        name: "Pets",
        subcategory: [
          {
            name: "Pets",
            type: "pets-pets"
          },
          {
            name: "Accesorries",
            type: "pets-accesorries"
          }
        ]
      }
    ];
  };
  changeCategory(ev: {ev: Event, value: {name: string, type: SubcategoryType, collection: string}}): void {
    this.updateCategoryType.emit(ev)
  }

}

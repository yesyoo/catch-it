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
            value: "personal-male-shoes"
          },
          {
            name: "Male clothes",
            value: "personal-male-clothes"
          },
          {
            name: "Female shoes",
            value: "personal-female-shoes"
          },
          {
            name: "Female clothes",
            value: "personal-female-clothes"
          },
          {
            name: "Bags",
            value: "personal-bags"
          },
          {
            name: "Other",
            value: "personal-other" 
          }
        ]
      },
      {
        name: "Kids",
        subcategory: [
          {
            name: "Boys clothes",
            value: "kids-boys-clothes"
          },
          {
            name: "Girls clothes",
            value: "kids-girls-clothes"
          },
          {
            name: "Kids shoes",
            value: "kids-shoes"
          },
          {
            name: "School",
            value: "kids-school"
          },
          {
            name: "Newborn",
            value: "kids-newborn"
          },
          {
            name: "Other",
            value: "kids-other"
          }
        ]
      },
      {
        name: "Home",
        subcategory: [
          {
            name: "Furniture",
            value: "home-furniture"
          },
          {
            name: "Appliances",
            value: "home-appliances"
          },
          {
            name: "Decor",
            value: "home-decor"
          },
          {
            name: "Other",
            value: "home-other"
          }
        ]
      },
      {
        name: "Pets",
        subcategory: [
          {
            name: "Pets",
            value: "pets-pets"
          },
          {
            name: "Accesorries",
            value: "pets-accesorries"
          }
        ]
      }
    ];
  };
  changeCategory(ev: {ev: Event, value: {name: string, value: SubcategoryType}}): void {
    this.updateCategoryType.emit(ev.value.value)
  }

}

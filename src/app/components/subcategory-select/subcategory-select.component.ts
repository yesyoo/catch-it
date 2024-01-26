import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CategoryType, SubcategoryType } from 'src/app/interfaces/category';
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
  @Input() selectedCategory: any 
  @Output() updateCategoryType: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit() {
    this.category = [
      {
        label: "Personal",
        options: [
          {
            label: "Male shoes",
            category: "personal-shoes",
            subcategory: "adult-male-shoes"
          },
          {
            label: "Male clothes",
            category: "personal-clothes",
            subcategory: "adult-male-clothes"
          },
          {
            label: "Female shoes",
            category: "personal-shoes",
            subcategory: "adult-female-shoes"
          },
          {
            label: "Female clothes",
            category: "personal-clothes",
            subcategory: "adult-female-clothes"
          },
          {
            label: "Bags",
            category: "personal-bags",
            subcategory: "adult-bags"
          },
          {
            label: "Other",
            category: "personal-accessories",
            subcategory: "adult-other" 
          }
        ]
      },
      {
        label: "Kids",
        options: [
          {
            label: "Boys clothes",
            category: "personal-clothes",
            subcategory: "child-male-clothes"
          },
          {
            label: "Girls clothes",
            category: "personal-clothes",
            subcategory: "child-female-clothes"
          },
          {
            label: "Boys shoes",
            category: "personal-shoes",
            subcategory: "child-male-shoes"
          },
          {
            label: "Girls shoes",
            category: "personal-shoes",
            subcategory: "child-female-shoes"
          },
          {
            label: "School",
            category: "kids-all",
            subcategory: "child-school"
          },
          {
            label: "Newborn",
            category: "kids-all",
            subcategory: "child-newborn"
          },
          {
            label: "Other",
            category: "kids-all",
            subcategory: "child-other"
          }
        ]
      },
      {
        label: "Home",
        options: [
          {
            label: "Furniture",
            category: "home-all",
            subcategory: "home-furniture"
          },
          {
            label: "Appliances",
            category: "home-all",
            subcategory: "home-appliances"
          },
          {
            label: "Decor",
            category: "home-all",
            subcategory: "home-decor"
          },
          {
            label: "Other",
            category: "home-all",
            subcategory: "home-other"
          }
        ]
      },
      {
        label: "Pets",
        options: [
          {
            label: "Pets",
            category: "pets-all",
            subcategory: "pets-pets"
          },
          {
            label: "Accesorries",
            category: "pets-all",
            subcategory: "pets-accessories"
          }
        ]
      }
    ];
    this.selectedCategory = this.category[0].options[0]
  };

  changeCategory(ev: {ev: Event, value: {label: string,  category: CategoryType, subcategory: SubcategoryType,}}): void {
    this.updateCategoryType.emit(ev)
  };
}

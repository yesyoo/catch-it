import { Component, Input, OnInit, Output } from '@angular/core';
import { CategoryType, SubcategoryType } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/deal-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../../../../../../services/modal/modal.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UnionCategoryType, IItem } from 'src/app/interfaces/items';

@Component({
  selector: 'app-user-items-form',
  templateUrl: './user-items-form.component.html',
  styleUrls: ['./user-items-form.component.scss']
})
export class UserItemsFormComponent implements OnInit {

  @Input() show: boolean = false
  userId: string = "user123";
  dealType: DealType = 'donate';
  subcategoryType: SubcategoryType = 'adult-male-shoes'; 
  categoryConfig: any;
  formInputConfig: any;

  // form
  form: FormGroup;
  firstFormName: string = 'first';
  secondFormName: string = 'second';
  firstForm: FormGroup;
  secondForm: FormGroup;
  firstFormFields: any[] = [];
  secondFormFields: any[] = [];
  path: string = 'personal-shoes';

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private modalService: ModalService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.modalService.showModal$.subscribe(data => this.show = data )

    this.http.get('../../../../../../../assets/config/form-category-list.json').subscribe(data => {
      this.categoryConfig = data;
      this.http.get('../../../../../../../assets/config/form-input-list.json').subscribe(array => {
        this.formInputConfig = array;

        this.firstFormFields = this.updateFormInputs(this.dealType)
        this.secondFormFields = this.updateFormInputs(this.subcategoryType)

        this.form = this.formBuilder.group({})
        this.firstForm = this.formBuilder.group({})
        this.secondForm = this.formBuilder.group({})

        this.form.addControl(this.firstFormName, this.firstForm)
        this.addFormControls(this.firstForm, this.firstFormFields)

        this.form.addControl(this.secondFormName, this.secondForm)
        this.addFormControls(this.secondForm, this.secondFormFields)
      })
    })
  };

  ngOnDestroy(): void {
    this.router.navigateByUrl('/user')
  };

  updateFormInputs(type: DealType | SubcategoryType): any[] {
    const arr: any[] = this.categoryConfig[type]
    const res: any[] = []
    arr.forEach(category => res.push(this.formInputConfig[category]))
    return res
  };

  addFormControls(form: FormGroup, array: any[]): void {
    array.forEach(field => {
      if(field.type === 'select') {        
        form.addControl(field.name, this.formBuilder.control(field.options[0].value)) 
      } else {
        if(field.validators) {
          let controlValidators: any[] = []
          let validatorsArr: any[] = field.validators

          validatorsArr.forEach(validator => { 
            switch(validator.type) {
              case "maxLength":
                controlValidators.push(Validators.maxLength(validator.value))
                break
              case "minLength":
                controlValidators.push(Validators.minLength(validator.value))
                break
              case "max": 
                controlValidators.push(Validators.max(validator.value))
                break
              case "min":
                controlValidators.push(Validators.min(validator.value))
                break
            }       
        });
        form.addControl(field.name, this.formBuilder.control('123456', controlValidators)) 
        } else {
          form.addControl(field.name, this.formBuilder.control(null)) 
        }
      }
    })
  };

  changeDealType(ev: {ev: Event, value: {label: string, value: DealType}}): void {
    this.dealType = ev.value.value
    this.firstFormFields = this.updateFormInputs(this.dealType)
    this.form.removeControl(this.firstFormName)
    this.firstForm = this.formBuilder.group({})
    this.firstFormName = this.generateGroupName()
    this.form.addControl(this.firstFormName, this.firstForm)
    this.addFormControls(this.firstForm, this.firstFormFields)
  };

  changeCategoryType(ev: {ev: Event, value: {label: string, category: CategoryType, subcategory: SubcategoryType}}): void {
    this.subcategoryType = ev.value.subcategory
    this.path = ev.value.category
    this.secondFormFields = this.updateFormInputs(this.subcategoryType)

    this.form.removeControl(this.secondFormName)
    this.secondForm = this.formBuilder.group({})
    this.secondFormName = this.generateGroupName()
    this.form.addControl(this.secondFormName, this.secondForm)
    this.addFormControls(this.secondForm, this.secondFormFields)
  };

  onSubmit(): any {
    if(this.form.contains(this.secondFormName)) {
      const firstForm = {
        title: this.form.get(this.firstFormName)?.value.title,
        description: this.form.get(this.firstFormName)?.value.description,
        condition: this.form.get(this.firstFormName)?.value.condition || null,
        amount: this.form.get(this.firstFormName)?.value.amount || null,
        city: this.form.get(this.firstFormName)?.value.city,
        district: this.form.get(this.firstFormName)?.value.district,
        delivery: this.form.get(this.firstFormName)?.value.delivery || null,
        img: this.form.get(this.firstFormName)?.value.img || null,
      };
      
      let data: {userId: string, dealType: DealType, subcategoryType: SubcategoryType, form: {itemProp: IItem, categoryProp: UnionCategoryType}} = {
        userId: this.userId,
        dealType: this.dealType,
        subcategoryType: this.subcategoryType,
        form: {
          itemProp: firstForm,
          categoryProp: this.form.get(this.secondFormName)?.value
        }
      };

      if(this.subcategoryType.includes('adult') || this.subcategoryType.includes('child')) {
        if(this.subcategoryType.includes('female')) {
          data.form.categoryProp['gender'] = 'female'
        } else if(this.subcategoryType.includes('male')) {
          data.form.categoryProp['gender'] = 'male'
        } else { 
          data.form.categoryProp['gender'] = 'genderless'
        }
        this.subcategoryType.includes('adult') ?
        data.form.categoryProp['age'] = 'adult' : data.form.categoryProp['age'] = 'child'
      };

      console.log('post', data)
      console.log(this.path)
      this.itemService.setItem(this.path, data).subscribe()      
    } else {
      console.log('set category')
    }
  };
  generateGroupName(): string {
    return 'control_' + Date.now()
  }
};

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItemData } from 'src/app/interfaces/items';
import { IUser } from 'src/app/interfaces/user';
import { ConfigFormsService } from 'src/app/services/config/config-forms/config-forms.service';
import { ItemService } from 'src/app/services/item/item.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-item-form',
  templateUrl: './user-item-form.component.html',
  styleUrls: ['./user-item-form.component.scss']
})
export class UserItemFormComponent implements OnInit {
  user: IUser | null
  @Output() closeThisForm: EventEmitter<any> = new EventEmitter()
  @Input() show: boolean = false
  showPreview: boolean = false

  deal: Deal = 'donate';
  category: Category = 'adult-male-shoes'; 
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
  path: Collection = 'personal-shoes';

  renderPreviewCard: any
  postData: IPostItemData
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter()

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private modalService: ModalService,
              private userService: UserService ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.modalService.showModal$.subscribe(data => this.show = data )
    this.categoryConfig = ConfigFormsService.forms
    this.formInputConfig = ConfigFormsService.inputs
    //form
    this.firstFormFields = this.updateFormInputs(this.deal)
    this.secondFormFields = this.updateFormInputs(this.category)
    this.form = this.formBuilder.group({})
    this.firstForm = this.formBuilder.group({})
    this.secondForm = this.formBuilder.group({})
    this.form.addControl(this.firstFormName, this.firstForm)
    this.addFormControls(this.firstForm, this.firstFormFields)
    this.form.addControl(this.secondFormName, this.secondForm)
    this.addFormControls(this.secondForm, this.secondFormFields)
  };

  updateFormInputs(type: Deal | Category): any[] {
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
        form.addControl(field.name, this.formBuilder.control(123456, controlValidators)) 
        } else {
          form.addControl(field.name, this.formBuilder.control(null)) 
        }
      }
    })
  };

  updateDeal(ev: {ev: Event, value: {label: string, type: Deal}}): void {
    this.deal = ev.value.type
    this.firstFormFields = this.updateFormInputs(this.deal)
    this.form.removeControl(this.firstFormName)
    this.firstForm = this.formBuilder.group({})
    this.firstFormName = this.generateGroupName()
    this.form.addControl(this.firstFormName, this.firstForm)
    this.addFormControls(this.firstForm, this.firstFormFields)
  };

  updateCategory(ev: {ev: Event, value: {label: string, collection: Collection, category: Category}}): void {
    this.category = ev.value.category
    this.path = ev.value.collection
    this.secondFormFields = this.updateFormInputs(this.category)
    this.form.removeControl(this.secondFormName)
    this.secondForm = this.formBuilder.group({})
    this.secondFormName = this.generateGroupName()
    this.form.addControl(this.secondFormName, this.secondForm)
    this.addFormControls(this.secondForm, this.secondFormFields)
  };

  preview() {
    if(this.user) {
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
        let data: IPostItemData = {
          userId: this.user.id,
          collection: this.path,
          category: this.category,
          deal: this.deal,
          item: firstForm,
          itemCat: this.form.get(this.secondFormName)?.value
          };
        if(this.category.includes('adult') || this.category.includes('child')) {
          if(this.category.includes('female')) {
            data.itemCat['gender'] = 'female'
          } else if(this.category.includes('male')) {
            data.itemCat['gender'] = 'male'
          } else { 
            data.itemCat['gender'] = 'genderless'
          }
          this.category.includes('adult') ?
          data.itemCat['age'] = 'adult' : data.itemCat['age'] = 'child'
        };
        this.postData = data

        this.renderPreviewCard = {
          userId: this.postData.userId,
          deal: this.postData.deal,
          item: this.postData.item,
          itemCat: this.postData.itemCat
        }
        console.log(this.postData)
        this.showPreview = true
      };
    this.itemService.postItem(this.path, this.postData).subscribe(data => console.log('item saved'))  
  };
   
  onSubmit(): any {
    // this.itemService.postItem(this.path, this.postData).subscribe(data => console.log('item saved'))  
  };

  generateGroupName(): string {
    return 'control_' + Date.now()
  };

  afterPreview(submit: boolean) {
    if(submit) {
      this.onSubmit()
      this.showPreview = false
      this.closeForm.emit(true)
    } else  {
      this.showPreview = false
    }
  };
}

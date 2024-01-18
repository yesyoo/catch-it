import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { SubcategoryType } from 'src/app/interfaces/category';
import { DealType } from 'src/app/interfaces/deal-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ItemService } from 'src/app/services/item/item.service';
import { ModalService } from '../../../../../../services/modal/modal.service';

@Component({
  selector: 'app-user-items-form',
  templateUrl: './user-items-form.component.html',
  styleUrls: ['./user-items-form.component.scss']
})
export class UserItemsFormComponent implements OnInit {
  configInputs: any;
  dealType: DealType = 'donate'
  subcategoryType: SubcategoryType;
  
  dealInputs: any[] = [];
  subcategoryInputs: any[] = [];

  dealMenuType: any[];
 
  form: FormGroup;
  formDealInputs: FormGroup;
  formDealInputsName: string = "formDealInputsName"
  formSubcategoryInputs: FormGroup;
  formSubcategoryInputsName: string = "formSubcategoryInputsName"
  formIsValid: boolean = false

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private modalService: ModalService,
              @Inject(Router) private router: Router,
              @Inject(HttpClient) private http: HttpClient) { }

  ngOnInit(): void {
    this.dealMenuType = [
      {
        name: "Donate",
        value: "donate"
      },
      {
        name: "Request",
        value: "request"
      },
      {
        name: "Exchange",
        value: "exchange"
      }
    ];
    
    this.http.get('../../../../../../../assets/config/dynamic-form-fields.json').subscribe(data => { 
      this.configInputs = data
      
      const dealInputsArray: DealType[] = this.configInputs[this.dealType]
      dealInputsArray.forEach(input => this.dealInputs.push(input)) 
      this.addForm()
      this.addFormControl(this.formDealInputs, this.dealInputs)
    });
  };

  ngOnDestroy(): void {
    this.router.navigateByUrl('/user')
  };

  addForm(): void {
    this.form = this.formBuilder.group({})
    this.formDealInputs = this.formBuilder.group({})
    this.formSubcategoryInputs = this.formBuilder.group({})
    this.form.addControl(this.formDealInputsName, this.formDealInputs)
  };

  addFormControl(form: FormGroup, array: any[]): void {
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
        form.addControl(field.name, this.formBuilder.control(null, controlValidators)) 
        } else {
          form.addControl(field.name, this.formBuilder.control(null)) 
        }
      }
    })
  };

  changeDealType(ev: {ev: Event, value: {name: string, value: DealType}}): void {
    this.dealType = ev.value.value
    this.form.removeControl(this.formDealInputsName)
    this.form.addControl(this.formDealInputsName, this.formDealInputs)
    this.dealInputs = []
    let dealInputsArray: DealType[] = this.configInputs[this.dealType]
    dealInputsArray.forEach(input => this.dealInputs.push(input)) 
    this.addFormControl(this.formDealInputs, this.dealInputs)
  };

  updateCategoryType(ev: SubcategoryType): void {
    this.subcategoryType = ev
    this.form.removeControl(this.formSubcategoryInputsName)
    this.form.addControl(this.formSubcategoryInputsName, this.formSubcategoryInputs)
    this.subcategoryInputs = []
    let subcategoryInputsArray: SubcategoryType[] = this.configInputs[this.subcategoryType]
    subcategoryInputsArray.forEach(input => this.subcategoryInputs.push(input))
    this.addFormControl(this.formSubcategoryInputs, this.subcategoryInputs)
    this.formIsValid = true
  };

  onSubmit(): any {
    if(this.form.contains(this.formSubcategoryInputsName)) {
      const formData: any = this.form.getRawValue();
      this.itemService.setItem(formData)
      this.modalService.show(false)
      
    } else {
      console.log('set category')
    }
  };
};

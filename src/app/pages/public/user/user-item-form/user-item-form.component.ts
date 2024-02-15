import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Category, Collection } from 'src/app/interfaces/category';
import { Deal } from 'src/app/interfaces/deal-type';
import { IPostItem } from 'src/app/interfaces/items';
import { IUser } from 'src/app/interfaces/user';
import { BoardService } from 'src/app/services/board/board.service';
import { ConfigFormsService } from 'src/app/services/config/config-forms/config-forms.service';
import { ItemService } from 'src/app/services/item/item.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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
  postData: IPostItem
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter()

  display: boolean
  imgFile: File

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              private modalService: ModalService,
              private userService: UserService,
              private board: BoardService,
              private messageService: MessageService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.display = true
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

    console.log('this.user', this.user)
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

  submit() {    
    if(this.user) { 
      let formData = new FormData()
      formData.append('user', this.user.id)
      formData.append('collection', this.path)
      formData.append('category', this.category)
      formData.append('deal', this.deal)
      formData.append('item', JSON.stringify(this.form.get(this.firstFormName)?.value))
      formData.append('cat', JSON.stringify(this.form.get(this.secondFormName)?.value))
      formData.append('img', this.imgFile)
 
      this.itemService.postItem(formData).then(() => {
        this.messageService.add({severity:'success', life: 1000, summary: 'success'});
        setTimeout(()=> { this.closeThisForm.emit() }, 1100)
      })
    };
  };
   
  generateGroupName(): string {
    return 'control_' + Date.now()
  };

  selectFile(ev: any) {
    if(ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.imgFile = file
      console.log(this.imgFile)
    };
  }
}

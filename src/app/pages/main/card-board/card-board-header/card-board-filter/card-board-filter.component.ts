import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryType, SubcategoryType } from '../../../../../interfaces/category';
import { FormControl, FormGroup } from '@angular/forms';
import { DealType } from '../../../../../interfaces/items';

@Component({
  selector: 'app-card-board-filter',
  templateUrl: './card-board-filter.component.html',
  styleUrls: ['./card-board-filter.component.scss']
})
export class CardBoardFilterComponent implements OnInit, OnChanges {

  @Input() categoryType: CategoryType
  @Input() subcategoryType: SubcategoryType
  @Input() dealType: DealType
  @Input() showFilter: boolean;
  @Output() filterParams: EventEmitter<string> = new EventEmitter()

  categoryConfig: any;
  formInputConfig: any;

  inputObjList: any[] = [];
  defaultInputs: string[] = ["condition", "delivery"]
  subcategoryInputs: any[];
  form: FormGroup;

  inputList: any[]
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('../../../../../../../../../assets/config/form-category-list.json').subscribe(data => {
      this.categoryConfig = data;
      this.http.get('../../../../../../../../../assets/config/form-input-list.json').subscribe(array => {
        this.formInputConfig = array;
        this.addForm()
        })
    })
  };

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['showFilter']) {
      console.log('changes 1')
      setTimeout(() => {this.addForm()}, 100)
      //дважды =(    
    } 
    else if(changes['subcategoryType']) {
      console.log('changes 2')
      setTimeout(() => {this.addForm()}, 100)
    }
  };

  addForm(): void {
    this.inputObjList = []
    this.defaultInputs = ["condition", "delivery"]
    this.inputList = this.categoryConfig[this.subcategoryType]
    this.inputList.forEach(input => this.defaultInputs.push(input))
    this.defaultInputs.forEach(input => { this.inputObjList.push(this.formInputConfig[input])})
    this.form = new FormGroup({})
  };

  addControl(ev: Event) {
    const id = (ev.target as HTMLElement).getAttribute('id')
    if(id) {
      const item = this.inputObjList.filter(el => id === el.name)[0]
      if(!item.show) {
        item.show = true
        this.form.addControl(id, new FormControl(item.options[0].value))
      } else if(item.show) {
        this.form.removeControl(id)
        item.show = false
      }
    }
  };
  
  setParams(): void {
    const obj = this.form.getRawValue()
    // регулярка позора
    const string: string = JSON.stringify(obj)
    let res = string.replace(/{/g, '')
                    .replace(/}/g, '')
                    .replace(/"/g, '')
                    .replace(/,/g, '&')
                    .replace(/:/g, '=')
    this.filterParams.emit(`subcategoryType=${this.subcategoryType}&${res}`)
  };
}

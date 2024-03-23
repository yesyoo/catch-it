import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Collection, Category } from 'src/app/models/interfaces/category';
import { Deal } from 'src/app/models/interfaces/deal-type';
import { ConfigFormsService } from 'src/app/services/config/config-forms/config-forms.service';
import { IItemDB } from '../../../../../../models/interfaces/items';


@Component({
  selector: 'app-board-search-filter',
  templateUrl: './board-search-filter.component.html',
  styleUrls: ['./board-search-filter.component.scss']
})
export class BoardSearchFilterComponent implements OnInit {

  @Input() collection: Collection
  @Input() category: Category
  @Input() deal: Deal
  @Input() show: boolean;
  @Output() updateFilterParamsRequest: EventEmitter<string> = new EventEmitter()
  items: IItemDB[] = []
  categoryFieldsConfig: any;
  inputListConfig: any;
  defaultFieldsNameList: string[] = ["condition", "delivery"];
  fieldsNameListFromConfig: any[] = [];
  form: FormGroup;
  inputs: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.categoryFieldsConfig = ConfigFormsService.forms
    this.inputListConfig = ConfigFormsService.inputs
    this.addForm()
  };

  ngOnChanges(changes: SimpleChanges): void {    
    if(changes['show'] || changes['category']) {
      setTimeout(() => {this.addForm()}, 100)
    };
  }; 

  addForm(): void {
    this.inputs = []    
    this.form = new FormGroup({})
    this.defaultFieldsNameList = ["condition", "delivery"]
    this.fieldsNameListFromConfig = this.categoryFieldsConfig[this.category]
    this.fieldsNameListFromConfig.forEach(input => this.defaultFieldsNameList.push(input))
    this.defaultFieldsNameList.forEach(input => { this.inputs.push({...this.inputListConfig[input]})})
  };

  addControl(ev: Event) {
    const id = (ev.target as HTMLElement).getAttribute('id')
    if(id) {
      const item = this.inputs.filter(el => id === el.name)[0]
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
    const string: string = JSON.stringify(obj)
    let res = string.replace(/{/g, '')
                    .replace(/}/g, '')
                    .replace(/"/g, '')
                    .replace(/,/g, '&')
                    .replace(/:/g, '=')
    this.updateFilterParamsRequest.emit(`category=${this.category}&${res}`)
  };
}

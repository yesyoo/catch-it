import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  display: boolean;
  @Output() closeSettings: EventEmitter<any> = new EventEmitter()
  @Input() show: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.display = true
  }
  

}

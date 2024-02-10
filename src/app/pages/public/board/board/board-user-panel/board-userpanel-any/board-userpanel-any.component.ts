import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-userpanel-any',
  templateUrl: './board-userpanel-any.component.html',
  styleUrls: ['./board-userpanel-any.component.scss']
})
export class BoardUserpanelAnyComponent implements OnInit {

  @Input() user: any;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }
  back() {
    this.navigationService.home()

  }

}

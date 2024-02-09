import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-user-visitor-panel',
  templateUrl: './board-user-visitor-panel.component.html',
  styleUrls: ['./board-user-visitor-panel.component.scss']
})
export class BoardUserVisitorPanelComponent implements OnInit {

  @Input() user: any;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }
  back() {
    this.navigationService.home()

  }

}

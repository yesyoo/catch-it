import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-userpanel-any',
  templateUrl: './board-userpanel-any.component.html',
  styleUrls: ['./board-userpanel-any.component.scss']
})
export class BoardUserpanelAnyComponent implements OnInit {

  @Input() user: any;

  constructor(private navigationService: NavigationService,
              private board: BoardService) { }

  ngOnInit(): void {
  }
  exit() {
    this.navigationService.home()
    this.board.render('main-storage')
  }

}

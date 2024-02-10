import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ViewerType } from 'src/app/types/types';

@Component({
  selector: 'app-board-card-list',
  templateUrl: './board-card-list.component.html',
  styleUrls: ['./board-card-list.component.scss']
})
export class BoardCardListComponent implements OnInit {

  items: any[];
  itemsReverse: any[];
  viewerType: ViewerType


  constructor(private board: BoardService,
              private nav: NavigationService) { }

  ngOnInit(): void {
    this.board.storageType$.subscribe(storageType => {
      if(storageType === 'any-storage') {
        this.viewerType = 'visitor-user'
        this.items = this.board.getStorage('any-storage')
        if(this.items.length <= 0) {
          this.board.sendErrorMessage('Items not found')
          this.itemsReverse = []
        } else {
          this.board.sendErrorMessage('')
          this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
        }
      };
      if(storageType === 'main-storage') {
        this.viewerType = 'visitor-user'
        this.items = this.board.getStorage('main-storage')
        if(this.items.length <= 0) {
          this.board.sendErrorMessage('Items not found')
          this.itemsReverse = []
        } else {
          this.board.sendErrorMessage('')
          this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
        }
      };
      if(storageType === 'owner-storage') {
        this.viewerType = 'owner-user'
        this.items = this.board.getStorage('owner-storage')
        if(this.items.length <= 0) {
          this.board.sendErrorMessage('Items not found')
          this.itemsReverse = []
        } else {
          this.board.sendErrorMessage('')
          this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
        }
      }
    });
  };
  openCard(item: any) {
    this.board.setSelectedCard(item);
    this.board.setSelectedUserId(item.user)
    this.nav.item(item._id, item.user)
  };
}

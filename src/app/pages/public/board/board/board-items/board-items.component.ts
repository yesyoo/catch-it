import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../../../../services/board/board.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-items',
  templateUrl: './board-items.component.html',
  styleUrls: ['./board-items.component.scss']
})
export class BoardItemsComponent implements OnInit {
  items: any[];
  itemsReverse: any[];
  type: 'visitor' | 'owner' | 'anyUser' = 'owner'

  showCheckbox: boolean;

  constructor(private board: BoardService,
              private goTo: NavigationService) { }

  ngOnInit(): void {
    
    this.board.storageType$.subscribe(storageType => {
      if(storageType === 'visitor') {
        this.type = 'visitor'
        this.items = this.board.getVisitorStorage()
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
      }
      if(storageType === 'owner') {
        this.type = 'owner'
        this.items = this.board.getOwnerStorage()
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
      }

      ////
      // if(storageType === 'anyUser') {
      //   this.type = 'visitor'
      //   this.items = this.board.getAnyUserStorage()
      //   this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
      // }
      ///
    });
  };

  openCard(item: any) {
    this.board.setSelectedCard(item);
    this.board.setSelectedUserId(item.user)
    this.goTo.item(item._id, item.user)
  };
}

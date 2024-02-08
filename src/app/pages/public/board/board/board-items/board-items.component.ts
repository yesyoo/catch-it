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
  type: 'users' | 'owner' = 'users'

  constructor(private board: BoardService,
              private goTo: NavigationService) { }

  ngOnInit(): void {
    
    
    console.log('boardItems init and subscribe boardType changes =>')
    this.board.boardType$.subscribe(type => {
      if(type === 'users') {
        this.items = this.board.getStorage()
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
        console.log('get users cards', this.items)
      }
      if(type === 'owner') {
        this.items = this.board.getUserStorage()
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
        console.log('get owner cards', this.items)
      }
    });
  };

  openCard(item: any) {
    this.board.setSelectedCard(item);
    this.board.setSelectedUserId(item.user)
    this.goTo.item(item._id, item.user)
  };
}

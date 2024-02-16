import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ViewerType } from 'src/app/types/types';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IItemDB } from '../../../../../interfaces/items';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-board-card-list',
  templateUrl: './board-card-list.component.html',
  styleUrls: ['./board-card-list.component.scss']
})
export class BoardCardListComponent implements OnInit {

  items: IItemDB[];
  itemsReverse: IItemDB[];
  viewerType: ViewerType;

  constructor(private board: BoardService,
              private nav: NavigationService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.board.storageType$.subscribe(storageType => {
      storageType === 'owner-storage' ? this.viewerType = 'owner-user' : this.viewerType = 'visitor-user';
      
      this.items = this.storage.getStorage(storageType);
      if(this.items.length == 0) {
        this.board.sendErrorMessage('Not found')
        this.itemsReverse = []
      } else {
        this.board.sendErrorMessage('')
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
      }
    });
  };

  openCard(item: any) {
    this.board.setSelectedCard(item);
    this.board.setSelectedUserId(item.user)
    this.nav.item(item._id, item.user)
  };
}

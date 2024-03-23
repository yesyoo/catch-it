import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ViewerType } from 'src/app/models/types/types';
import { IItemDB } from '../../../../../models/interfaces/items';
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

  constructor(private boardService: BoardService,
              private navigationService: NavigationService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.boardService.storageType$.subscribe(storageType => {
      storageType === 'owner-storage' ? this.viewerType = 'owner-user' : this.viewerType = 'visitor-user';
      
      this.items = this.storageService.getStorage(storageType);
      if(this.items.length == 0) {
        this.boardService.sendErrorMessage('Not found')
        this.itemsReverse = []
      } else {
        this.boardService.sendErrorMessage('')
        this.itemsReverse = this.items.sort(function(a, b) { return b.date - a.date })
      }
    });
  };

  openCard(item: IItemDB) {
    this.boardService.setSelectedCard(item);
    this.boardService.setSelectedUserId(item.user)
    this.navigationService.item(item._id, item.user)
  };
}

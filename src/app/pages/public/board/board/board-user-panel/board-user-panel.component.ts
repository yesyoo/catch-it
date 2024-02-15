import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { UserService } from 'src/app/services/user/user.service';
import { StorageType, BoardUserPanelType, ViewerType } from 'src/app/types/types';
import { NavigationService } from '../../../../../services/navigation/navigation.service';
import { pipe, takeLast } from 'rxjs';
import { IItemDB } from 'src/app/interfaces/items';
import { StorageService } from '../../../../../services/storage/storage.service';

@Component({
  selector: 'app-board-user-panel',
  templateUrl: './board-user-panel.component.html',
  styleUrls: ['./board-user-panel.component.scss']
})
export class BoardUserPanelComponent implements OnInit {

  ID: string;
  selectedUser: any;
  storageType: StorageType;
  userPanelType: BoardUserPanelType;
  viewerType: ViewerType;

  constructor(private authService: AuthService,
              private board: BoardService,
              private userService: UserService,
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService,
              private panel: PanelService,
              private storage: StorageService) { }

  ngOnInit(): void {
    this.panel.viewing$.subscribe(id => this.getUserData(id))

    const selectedUserId = this.board.getSelectedUserId()
    if(selectedUserId) { 
      this.checkViewer(selectedUserId) 
    } else { 
      this.activatedRoute.params.subscribe(path => this.checkViewer(path['id'])) 
    };


  };

  async checkViewer(id: string) {
    this.ID = this.authService.getUserIdFromLocalStorage()
    if(!this.ID) {
      this.viewerType = 'unauthorized-user';
      this.userPanelType = 'board-user-any-panel';
      this.getUserData(id)
    } else {
      this.userService.userIsLoaded$.subscribe(() => {
          if(this.ID !== id) {
            this.viewerType = 'visitor-user';
            this.userPanelType = 'board-user-any-panel';
            this.getUserData(id)
          } else { 
            this.userPanelType = 'board-user-owner-panel'
            this.setOwner() 
          }
      });
    }
  };

  async setOwner() {
    this.viewerType = 'owner-user';
    this.storageType = 'owner-storage';
    this.userPanelType = 'board-user-owner-panel';
    this.selectedUser = this.userService.getUser()
    if(this.storage.checkStorage('owner-storage')) {
      this.board.render('owner-storage')
    } else {
      this.itemService.getAllByOwnerId(this.ID).then(() => {
        this.board.render(this.storageType)
      })
    }
  };

  getUserData(id: string) {
    this.userService.getById(id).subscribe(data => {
      this.selectedUser = data;
    });
    this.itemService.getAllByUserId(id).then(() => {
        this.board.render('any-storage')
      })
  };
  

  ngOnDestroy(): void {
    this.board.showBoardUserPanel(false)
  };

  closeUserPage() {
    this.board.render('main-storage')
    this.navigationService.home()
  };

  exit() {
    this.navigationService.home()
  }

};

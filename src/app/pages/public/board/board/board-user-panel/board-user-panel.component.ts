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

@Component({
  selector: 'app-board-user-panel',
  templateUrl: './board-user-panel.component.html',
  styleUrls: ['./board-user-panel.component.scss']
})
export class BoardUserPanelComponent implements OnInit {

  private ID: string;
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
              private panel: PanelService) { }

  ngOnInit(): void {
    this.panel.viewing$.pipe(takeLast(1)).subscribe(id => this.getData(id))
    this.panel.homecoming$.subscribe(res => {
      if(res) {
        this.viewerType = 'owner-user';
        this.selectedUser = this.userService.getUser();
        this.userPanelType = 'board-user-owner-panel'
        this.storageType = 'owner-storage';
        const items = this.board.getStorage('owner-storage')
        if(items.length > 0) {
          this.board.render('owner-storage');
        } else {
          this.itemService.getAllByOwnerId('65c1e644fec7a96c177abcb9').subscribe(data => {
            if(Array.isArray(data)) {
              if(data.length > 0) {
                this.board.setToStorage(data, 'owner-storage');
                this.board.render('owner-storage');
              }
            }

          })
        }
        
      };
    });
    const selectedUserId = this.board.getSelectedUserId()
    if(selectedUserId) { this.checkViewer(selectedUserId) }
    else { this.activatedRoute.params.subscribe(path => this.checkViewer(path['id'])) };
  };

  checkViewer(id: string) {
    this.ID = this.authService.getUserIdFromLocalStorage()
    if(!this.ID) {
      this.viewerType = 'unauthorized-user';
      this.userPanelType = 'board-user-any-panel';
      this.getData(id)
    };
    if(this.ID !== id) {
      this.viewerType = 'visitor-user';
      this.userPanelType = 'board-user-any-panel';
      this.getData(id)
    };
    if(this.ID === id) {
      this.viewerType = 'owner-user';
      this.storageType = 'owner-storage';
      this.userPanelType = 'board-user-owner-panel';
      this.userService.getUserPromise().then(data => {
        this.selectedUser = data;
        this.board.checkStorage('owner-storage').then(res => {
          if(!res) {
            this.itemService.getAllByOwnerId(this.ID).subscribe(data => {
              if(Array.isArray(data)) {
                if(data.length > 0) {
                  this.board.setToStorage(data, 'owner-storage');
                  this.board.render('owner-storage');
                } else {
                  // this.board.sendErrorMessage('Cards not found')
                }
              } 

            })
          } else {
            this.board.render('owner-storage');
          };
        })
       });
    };
  };

  getData(id: string) {
    this.userService.getUserById(id).subscribe(data => {
      this.selectedUser = data;
    });
    this.itemService.getManyByUserId(id).subscribe(data => {
      if(Array.isArray(data)) {
        this.board.setToStorage(data, 'any-storage');
        this.board.render('any-storage');
      } else { 
        // this.board.sendErrorMessage('Cards not found')
      }
    })   
  };

  ngOnDestroy(): void {
    this.board.showUserPanel(false)
  };

  closeUserPage() {
    this.board.render('main-storage')
    this.navigationService.home()
  };

};

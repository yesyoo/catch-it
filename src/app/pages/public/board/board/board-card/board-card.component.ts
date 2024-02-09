import { Component, EventEmitter, OnDestroy, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BoardService } from '../../../../../services/board/board.service';
import { IUser } from '../../../../../interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item/item.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthRestService } from 'src/app/services/auth/auth-rest.service';
import { Collection } from '../../../../../interfaces/category';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {

  ID: string;
  userType: 'owner' | 'visitor' | 'unauthorized' | 'admin';
  isOwnerPage: boolean = this.navigationService.matchUsersId();

  item: any;

  display: boolean = true;
  showToast: boolean;
  toastMessage: string;

  constructor(private authService: AuthService,
              private board: BoardService,
              private itemService: ItemService,
              private activatedRoute: ActivatedRoute,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    //подписаться на тип юзера
    this.display = true
    this.ID = this.authService.getUserIdFromLocalStorage()
    this.item = this.board.getSelectedCard()
    
    if(!this.item) { 
      this.activatedRoute.params.subscribe(data => {
        this.itemService.getById(data['id']).subscribe(data => {
          this.item = data;
          this.matchUser();
        })
      })
    } else { this.matchUser() };
  };
  
  matchUser() {
    if(this.ID) {
      this.ID === this.item.user ? this.userType = 'owner' : this.userType = 'visitor'
    } else { this.userType = 'unauthorized' };
  };

  goToUser(id: string) {
    this.board.setSelectedUserId(id)
    this.navigationService.user(id)
  };

  closeCard() {
    window.history.back()
  };
  
  onHide() {
    this.closeCard()
  };

  login() {
    this.navigationService.auth()
  };

  showToastAndExit(message: string): void {
    this.toastMessage = message
      this.showToast = true
      setTimeout(() => { window.history.back() }, 500)
  };

}

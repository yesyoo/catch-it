import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { BookmarkService } from 'src/app/services/bookmark/bookmark.service';
import { ItemService } from 'src/app/services/item/item.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { UserService } from 'src/app/services/user/user.service';
import { StorageType } from 'src/app/types/types';
import { IUser } from '../../../interfaces/user';
import { AuthRestService } from '../../../services/auth/auth-rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  private ID: string = this.auth.getAuthUserID()
  user: IUser

  showForm: boolean = false
  showSettings: boolean = false;
  showMessages: boolean = false;

  constructor(private userService: UserService,
              private navigationService: NavigationService,
              private board: BoardService,
              private authService: AuthService,
              private bookmarks: BookmarkService,
              private auth: AuthService) {}

  ngOnInit(): void {
    this.userService.loadUser().then((user) => {
      this.user = user;
      this.bookmarks.loadBookmarks().then(() => {
        setTimeout(() => {this.userService.userIsLoaded.next(true)}, 1000)
      })
    });
  };

  addForm() {
    this.board.render('owner-storage')
    this.navigationService.profile()
    setTimeout(() => {this.showForm = true}, 600)
  };

  openBoard() {
    const location = this.navigationService.checkLocation(this.ID)
    switch(location) {
      case 'owner-board':
        this.navigationService.home();
        break;
      case 'home-page': 
        this.board.setSelectedUserId(this.ID)
        this.navigationService.profile()
        break;
      case 'any':
        this.navigationService.home();
        break
    }
  };

  logout() {
    this.authService.logout()
    this.board.showAuthModal(true)
    this.navigationService.auth()
  }
 
  openSettings() {
    setTimeout(() => {this.showSettings = true}, 600)
  };

  openMessages() {
    setTimeout(() => {this.showMessages = true}, 600)
  };

  goAdmin() {
    this.navigationService.admin()
  }
}

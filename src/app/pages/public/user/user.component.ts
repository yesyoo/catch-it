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
  
  user: IUser | null
  private ID: string = this.auth.getAuthUserID()

  showForm: boolean = false
  showSettings: boolean = false;
  showMessages: boolean = false;

  ownerPanelOpen: boolean = false
  isAdmin: boolean = false

  constructor(private userService: UserService,
              private itemService: ItemService,
              private navigationService: NavigationService,
              private board: BoardService,
              private panel: PanelService,
              private authService: AuthService,
              private bookmarks: BookmarkService,
              private auth: AuthService) {}

  ngOnInit(): void {
    this.panel.homecoming$.subscribe(res => this.ownerPanelOpen = res);
    this.bookmarks.getAllBookmarks().subscribe(data => {
      this.bookmarks.setBookmarksListId(data)
      console.log('bb', this.bookmarks.getBookmarksListId())
    });
    
    //
    const u: any = localStorage.getItem('user')
    if(u) {
      if(JSON.parse(u)['role'] === 'admin') {
        this.isAdmin = true
      }
    }
    //
    this.user = this.userService.getUser()
    const id: string | null = this.userService.getUserId()
    if(id) {
      this.userService.getUserById(id).subscribe(data => {
        this.userService.setUser(data)
        this.user = this.userService.getUser()
      })
    } else console.log('userId not found')

  };
  addForm() {
    this.ownerPanelOpen = true;
    this.board.render('owner-storage')
    this.navigationService.profile()
    setTimeout(() => {this.showForm = true}, 600)
    
  }
  openBoard() {
    if(this.user) {
      if(!this.ownerPanelOpen) {
        this.panel.openOwnerPanel(true)
        this.board.setSelectedUserId(this.user.id)
        this.board.render('owner-storage')
        this.navigationService.profile()
      } else {
        this.panel.openOwnerPanel(false)
        this.navigationService.home()
      }
    }
  };
  logout() {
    this.authService.logout()
    this.board.showAuthModal(true)
    this.navigationService.auth()
  }
 
  openSettings() {
    this.ownerPanelOpen = true;

    setTimeout(() => {this.showSettings = true}, 600)
  };
  openMessages() {
    this.ownerPanelOpen = true;

    setTimeout(() => {this.showMessages = true}, 600)
  };

  openBookmarks() {
    if(this.user) {
      if(!this.ownerPanelOpen) {
        this.panel.openOwnerPanel(true)
        this.board.setSelectedUserId(this.user.id)
        this.board.render('owner-storage')
        this.navigationService.profile()
      } else {
        this.panel.openOwnerPanel(false)
        this.navigationService.home()
      }
    }
  };
  goAdmin() {
    this.navigationService.admin()
  }
}

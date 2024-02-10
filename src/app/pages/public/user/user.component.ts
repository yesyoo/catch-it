import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { PanelService } from 'src/app/services/panel/panel.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  user: IUser | null
  showForm: boolean = false
  ownerPanelOpen: boolean = false
  isAdmin: boolean = false

  constructor(private userService: UserService,
              private itemService: ItemService,
              private navigationService: NavigationService,
              private board: BoardService,
              private panel: PanelService) {
   }

  ngOnInit(): void {
    this.panel.homecoming$.subscribe(res => this.ownerPanelOpen = res)
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
        // this.itemService.getByOwnerId(id).subscribe(items => {
        //   this.board.setOwnerCards(items)
        //   console.log('user items:', items)
        // })
        // console.log('user:', this.user)
      })
    } else console.log('userId not found')
  };
  addForm() {
    this.ownerPanelOpen = true;
    this.board.show('owner-storage')
    this.navigationService.profile()
    setTimeout(() => {this.showForm = true}, 600)
    
  }
  openBoard() {
    if(this.user) {
      if(!this.ownerPanelOpen) {
        this.panel.openOwnerPanel(true)
        this.board.setSelectedUserId(this.user.id)
        this.board.show('owner-storage')
        this.navigationService.profile()
      } else {
        this.panel.openOwnerPanel(false)
        this.navigationService.home()
      }
    }
  };
  openSettings() {
    // this.router.navigateByUrl('home/settings')
  }
  goAdmin() {
    this.navigationService.admin()
  }
}

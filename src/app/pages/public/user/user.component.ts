import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
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
  isBoardOpen: boolean = false

  constructor(private userService: UserService,
              private itemService: ItemService,
              private navigationService: NavigationService,
              private board: BoardService) {
   }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    const id: string | null = this.userService.getUserId()
    if(id) {
      this.userService.getUserById(id).subscribe(data => {
        this.userService.setUser(data)
        this.user = this.userService.getUser()
        this.itemService.getByOwnerId(id).subscribe(items => {
          this.board.setUserCards(items)
          console.log('user items:', items)
        })
        console.log('user:', this.user)
      })
    } else console.log('userId not found')
  };
  addForm() {
    this.isBoardOpen = true;
    this.board.changeBoardType('owner')
    this.navigationService.profile()
    setTimeout(() => {this.showForm = true}, 600)
    
  }
  openBoard() {
      this.board.changeBoardType('owner')
      this.navigationService.profile()
  };
  openSettings() {
    // this.router.navigateByUrl('home/settings')
  }
}

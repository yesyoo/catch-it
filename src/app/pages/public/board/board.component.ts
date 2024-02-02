import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { BoardService } from 'src/app/services/board/board.service';
import { ItemService } from 'src/app/services/item/item.service';
import { UserService } from '../../../services/user/user.service';
import { IUser } from '../../../interfaces/user';
import { IPostItemData } from '../../../interfaces/items';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  btnLabel: string = 'Login'

  items: IPostItemData[];
  user: IUser;

  constructor(private boardService: BoardService,
              private userService: UserService,
              private itemService: ItemService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const id = this.userService.getUserId()
    if(id) {
      this.btnLabel = 'Logout'
    } else this.btnLabel = 'Login'
  }
  auth() {
    if(this.btnLabel === 'Logout') {
      this.authService.logout()
      this.boardService.navigate('/auth')
    } else  this.boardService.navigate('/auth')
  };
}
